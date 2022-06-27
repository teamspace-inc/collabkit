import { events } from './events';
import {
  get,
  set,
  ref,
  getDatabase,
  onChildAdded,
  push,
  serverTimestamp,
  onValue,
  update,
} from 'firebase/database';

import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { store } from './store';
import {
  CollabKitFirebaseApp,
  Event,
  IdentifyProps,
  MentionProps,
  SetupProps,
  Target,
} from './constants';
import { Color, getRandomColor } from './colors';
import { $createTextNode, $getRoot, createEditor } from 'lexical';
import { createEditorConfig } from './components/Composer';
import { ref as valtioRef } from 'valtio';

function timelineRef(workspaceId: string, threadId: string) {
  if (!store.config.setup?.appId) {
    throw new Error('no appId');
  }
  return ref(
    getDatabase(CollabKitFirebaseApp),
    `/timeline/${store.config.setup.appId}/${workspaceId}/${threadId}/`
  );
}

type GenerateToken =
  | {
      appId: string;
      mode: 'UNSECURED';
      token: string;
    }
  | {
      appId: string;
      mode: 'SECURED';
      token: string;
      userId: string;
    };

type FunctionResponse<T> =
  | {
      status: 200;
      data: T;
    }
  | {
      status: 201;
      data: T;
    }
  | {
      status: 400;
      error: string;
    }
  | {
      status: 401;
      error: string;
    }
  | {
      status: 500;
      error: string;
    };

// todo make this work in secured mode
async function generateToken(appId: string, apiKey: string, mode: 'SECURED' | 'UNSECURED') {
  try {
    const response = await fetch(`/api/generateToken?apiKey=${apiKey}&appId=${appId}&mode=${mode}`);

    if (response.ok) {
      const json = (await response.json()) as FunctionResponse<GenerateToken>;
      if (json.status === 200 || json.status === 201) {
        return json.data;
      } else {
        console.error(json);
      }
    } else {
      console.error('Failed to generateToken', response.status, await response.text());
    }
  } catch (e) {
    console.error('Failed to generateToken', e);
  }
  return null;
}

export const actions = {
  setup: async (props: SetupProps) => {
    store.appState = 'config';
    store.config.setup = props;
    actions.monitorConnection();
    document.addEventListener('keydown', events.onKeyDown);
  },

  identify: async (props: IdentifyProps) => {
    store.config.identify = props;
    store.workspaces[props.workspaceId] ||= {
      name: store.config.identify.workspaceName || '',
      timeline: {},
      composers: {},
    };
  },

  mentions: (props: MentionProps) => {
    store.config.mentions = props;
  },

  initThread: (props: { workspaceId: string; threadId: string }) => {
    store.workspaces[props.workspaceId] ||= {
      name: store.config.identify?.workspaceName || '',
      composers: {
        [props.threadId]: {
          editor: valtioRef(createEditor(createEditorConfig())),
          $$body: '',
        },
      },
      timeline: {},
    };

    store.workspaces[props.workspaceId].composers[props.threadId] ||= {
      editor: valtioRef(createEditor(createEditorConfig())),
      $$body: '',
    };
  },

  loadThread: async (props: { workspaceId: string; threadId: string }) => {
    const timeline = timelineRef(props.workspaceId, props.threadId);

    if (store.subs[timeline.toString()]) {
      return;
    }

    try {
      store.subs[timeline.toString()] = onChildAdded(timeline, events.onTimelineEventAdded);
    } catch (e) {
      console.error('onChildAdded', e);
    }
  },

  toggleThread: (props: { workspaceId: string; threadId: string }) => {
    actions.initThread(props);
    actions.loadThread(props);
  },

  monitorConnection: () => {
    if (store.subs['connectionState']) {
      return;
    }
    const connectedRef = ref(getDatabase(CollabKitFirebaseApp), '.info/connected');
    store.subs['connectionState'] = onValue(connectedRef, (snapshot) => {
      if (!store.isConnected && snapshot.val()) {
        events.onConnectionStateChange(snapshot.val());
      }
    });
  },

  saveProfile: async () => {
    const { config } = store;

    if (!config.setup) {
      console.warn('[CollabKit] Did you forget to call `CollabKit.setup`?');
      return;
    }

    if (!config.identify) {
      console.warn('[CollabKit] Did you forget to call `CollabKit.identify`?');
      return;
    }

    try {
      const color = getRandomColor();

      let profile: Partial<IdentifyProps> & { color: Color } = { ...config.identify, color };

      delete profile.workspaceId;
      delete profile.workspaceName;
      delete profile.userId;

      let workspace: Pick<IdentifyProps, 'workspaceId' | 'workspaceName'> = {
        workspaceId: config.identify.workspaceId,
      };

      // only if the user has explicitly passed workspaceName do
      // we want to apply it as a change
      if (config.identify.hasOwnProperty('workspaceName')) {
        workspace.workspaceName = config.identify.workspaceName;
      }

      await update(
        ref(
          getDatabase(CollabKitFirebaseApp),
          `/workspaces/${config.setup.appId}/${config.identify.workspaceId}/`
        ),
        workspace
      );

      await set(
        ref(
          getDatabase(CollabKitFirebaseApp),
          `/workspaces/${config.setup.appId}/${config.identify.workspaceId}/profiles/${config.identify.userId}`
        ),
        true
      );

      await set(
        ref(
          getDatabase(CollabKitFirebaseApp),
          `/profiles/${config.setup.appId}/${config.identify.userId}`
        ),
        profile
      );

      store.profiles[config.identify.userId] = profile;

      if (store.appState === 'config') {
        store.appState = 'ready';
      }
    } catch (e) {
      console.error(e);
    }
  },

  authenticate: async () => {
    const { config } = store;
    if (!config.setup) {
      console.warn('Did you forget to call `CollabKit.setup`?');
      return;
    }
    const auth = await generateToken(config.setup.appId, config.setup.apiKey, config.setup.mode);

    if (auth !== null) {
      store.token = auth.token;

      // use this code to tell the user what mode their app is running in
      // and if it's been configured properly
      //
      try {
        const userCredential = await signInWithCustomToken(
          getAuth(CollabKitFirebaseApp),
          store.token
        );

        const result = await userCredential.user.getIdTokenResult();
        const mode = result.claims.mode;

        console.log('mode', mode);
        console.log('signed in', userCredential);
      } catch (e) {
        console.error('failed to sign in', e);
      }

      // todo handle spotty network
      try {
        // this should be an onValue sub
        const snapshot = await get(
          ref(
            getDatabase(CollabKitFirebaseApp),
            `/profiles/${config.setup.appId}/${config.identify?.workspaceId}`
          )
        );
        const workspaceId = snapshot.key;
        if (workspaceId) {
          snapshot.forEach((child) => {
            const profile = child.val();
            if (workspaceId) {
              store.profiles[profile.id] = profile;
            }
          });
        }
      } catch (e) {
        console.error('collabkit.setup failed', e);
      }
    } else {
      console.error('failed to auth', auth);
    }
  },

  focus: (target: Target) => {
    store.focusedId = target;
  },

  blur: (target: Target) => {
    store.focusedId = null;
  },

  unloadThread: (props: { workspaceId: string; threadId: string }) => {
    store.subs[timelineRef(props.workspaceId, props.threadId).toString()]?.();
  },

  // removeSelection: () => {
  //   document.querySelectorAll('[data-commentable]').forEach((el) => {
  //     if (el.classList.contains('commentable-hover')) {
  //       el.classList.remove('commentable-hover');
  //     }
  //   });
  // },

  // hover: (el: Element) => {
  //   el.classList.add('commentable-hover');
  // },

  // startSelecting: () => {
  //   if (store.uiState === 'idle') {
  //     store.uiState = 'selecting';
  //     document.addEventListener('mouseover', events.onMouseOver);
  //     document.addEventListener('keydown', events.onKeyDown);
  //     document.addEventListener('mousedown', events.onMouseDown);
  //   }
  // },

  // startCommenting: (id: string) => {
  //   document.removeEventListener('mouseover', events.onMouseOver);
  //   document.removeEventListener('keydown', events.onKeyDown);
  //   if (store.appState === 'selecting') {
  //     store.appState = 'commenting';
  //   }
  // },

  // cancel: () => {
  //   store.appState = 'idle';
  //   // actions.removeSelection();
  //   document.removeEventListener('mousedown', events.onMouseDown);
  //   document.removeEventListener('mouseover', events.onMouseOver);
  //   document.removeEventListener('keydown', events.onKeyDown);
  // },

  sendMessage: async (workspaceId: string, threadId: string) => {
    if (!store.config.identify) {
      console.warn('[CollabKit] Did you forget to call CollabKit.identify?');
      return;
    }

    const { editor } = store.workspaces[workspaceId].composers[threadId];

    const body = editor.getEditorState().read(() => $getRoot().getTextContent(false));

    if (body.trim().length === 0) {
      // can't send empty messages
      return;
    }

    editor.update(() => $getRoot().getChildren()[0].replace($createTextNode('')));

    console.log('sending message', body);
    // todo optimistic send
    try {
      const event: Event = {
        type: 'message',
        body: body,
        createdAt: serverTimestamp(),
        createdById: store.config.identify.userId,
      };
      const eventRef = await push(timelineRef(workspaceId, threadId), event);
      if (eventRef.key) {
        store.workspaces[workspaceId].timeline[threadId] ||= {};
        store.workspaces[workspaceId].timeline[threadId][eventRef.key] = {
          ...event,
          createdAt: +Date.now(),
        };
      } else {
        console.error('failed to send message');
        // handle failure here
      }
    } catch (e) {
      console.error(e);
      // handle failure here
    }
  },
};
