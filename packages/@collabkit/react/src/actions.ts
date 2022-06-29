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
  DataSnapshot,
  onChildChanged,
} from 'firebase/database';

import { getAuth, signInWithCustomToken } from 'firebase/auth';
import {
  CollabKitFirebaseApp,
  CommentReactionTarget,
  CommentTarget,
  Event,
  IdentifyProps,
  MentionProps,
  SetupProps,
  Store,
  Target,
} from './constants';
import { Color, getRandomColor } from './colors';
import { $createTextNode, $getRoot, createEditor } from 'lexical';
import { createEditorConfig } from './components/Composer';
import { ref as valtioRef } from 'valtio';
import { createEvents, Events } from './events';

function timelineRef(store: Store, workspaceId: string, threadId: string) {
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

function monitorConnection(store: Store, events: ReturnType<typeof createEvents>) {
  if (store.subs['connectionState']) {
    return;
  }
  const connectedRef = ref(getDatabase(CollabKitFirebaseApp), '.info/connected');
  store.subs['connectionState'] = onValue(connectedRef, (snapshot) => {
    if (!store.isConnected && snapshot.val()) {
      events.onConnectionStateChange(snapshot.val());
    }
  });
}

function initThread(store: Store, props: { workspaceId: string; threadId: string }) {
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
}

async function loadThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const timeline = timelineRef(store, props.workspaceId, props.threadId);

  if (store.subs[timeline.toString()]) {
    return;
  }

  try {
    store.subs[timeline.toString()] = onChildAdded(timeline, (snapshot) =>
      onTimelineEventAdded(store, snapshot)
    );
  } catch (e) {
    console.error('onChildAdded', e);
  }
}

function subscribeProfiles(store: Store) {
  if (!store.config.setup) {
    console.warn('no profiles');
    return;
  }
  if (store.subs['profiles']) {
    return;
  }
  console.log('got sub profiles', store.config.setup.appId);
  try {
    store.subs['profiles'] = onChildAdded(
      ref(getDatabase(CollabKitFirebaseApp), `/profiles/${store.config.setup.appId}/`),
      (snapshot) => {
        console.log('got profile', snapshot.val());
        const profile = snapshot.val();
        const profileId = snapshot.key;
        if (profileId) {
          store.profiles[profileId] = profile;
        }
      },
      (e) => {
        console.error({ e });
      }
    );
  } catch (e) {
    console.error(e);
  }
}

function onTimelineEventAdded(store: Store, snapshot: DataSnapshot) {
  const event = snapshot.val();
  const eventId = snapshot.key;
  const workspaceId = snapshot.ref.parent?.ref.parent?.key;
  const threadId = snapshot.ref.parent?.key;

  console.log('got event');

  // todo validate data here
  //
  if (threadId && workspaceId && eventId) {
    store.workspaces[workspaceId].timeline[threadId] ||= {};
    store.workspaces[workspaceId].timeline[threadId][eventId] ||= event;
  }
}

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
  setup: async (store: Store, events: Events, props: SetupProps) => {
    store.appState = 'config';
    store.config.setup = props;
    monitorConnection(store, events);
  },

  identify: async (store: Store, props: IdentifyProps) => {
    store.config.identify = props;
    store.workspaces[props.workspaceId] ||= {
      name: store.config.identify.workspaceName || '',
      timeline: {},
      composers: {},
    };
  },

  mentions: (store: Store, props: MentionProps) => {
    store.config.mentions = props;
  },

  toggleThread: (store: Store, props: { workspaceId: string; threadId: string }) => {
    initThread(store, props);
    loadThread(store, props);
  },

  subscribeProfiles,

  saveProfile: async (store: Store) => {
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

  authenticate: async (store: Store) => {
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

  focus: (store: Store, target: Target) => {
    store.focusedId = target;
  },

  blur: (store: Store, target: Target) => {
    store.focusedId = null;
  },

  unloadThread: (store: Store, props: { workspaceId: string; threadId: string }) => {
    store.subs[timelineRef(store, props.workspaceId, props.threadId).toString()]?.();
  },

  toggleCommentReaction: async (store: Store, props: { target: CommentReactionTarget }) => {
    if (!store.config.identify) {
      console.warn('[CollabKit] Did you forget to call CollabKit.identify?');
      return;
    }

    const { emoji } = props.target;
    const { workspaceId, threadId, eventId } = props.target.comment;

    // check if this user has a last reaction to the comment already
    const thread = store.workspaces[workspaceId].timeline[threadId];
    const reactions = Object.keys(thread)
      .map((eventId) => thread[eventId])
      .filter(
        (event) => event.parentId === eventId && event.createdById === store.config.identify?.userId
      );

    const lastReaction = reactions.length > 0 ? reactions[reactions.length - 1] : null;

    // toggle logic
    // if we have no a last Reaction we need to check
    // if this is a toggle operation
    const body = lastReaction
      ? // if the last event was clearing the reaction
        // then we want to set it this time
        lastReaction.body.length === 0
        ? emoji
        : // otherwise if the reaction is the same
        // we want to clear it
        emoji === lastReaction.body
        ? ''
        : emoji
      : emoji;

    console.log('reacting with emoji', { body });

    // to remove an existing emoji reaction set
    // body to empty!

    try {
      const event: Event = {
        type: 'reaction',
        body,
        createdAt: serverTimestamp(),
        createdById: store.config.identify.userId,
        parentId: eventId,
      };

      const eventRef = await push(timelineRef(store, workspaceId, threadId), event);

      if (eventRef.key) {
        store.workspaces[workspaceId].timeline[threadId] ||= {};
        store.workspaces[workspaceId].timeline[threadId][eventRef.key] = {
          ...event,
          createdAt: +Date.now(),
        };

        store.reactingId = null;
      } else {
        console.error('failed to toggle emoji reaction');
        // handle failure here
      }
    } catch (e) {
      console.error(e);
      // handle failure here
    }
  },

  toggleEmojiReactionPicker: (store: Store, props: { target: CommentTarget }) => {
    store.reactingId = props.target;
  },

  closeEmojiReactionPicker: (store: Store) => {
    store.reactingId = null;
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

  sendMessage: async (store: Store, workspaceId: string, threadId: string) => {
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

    // close emoji picker on send
    store.reactingId = null;

    // todo optimistic send
    try {
      const event: Event = {
        type: 'message',
        body: body,
        createdAt: serverTimestamp(),
        createdById: store.config.identify.userId,
      };
      const eventRef = await push(timelineRef(store, workspaceId, threadId), event);
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
