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
} from 'firebase/database';

import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { store } from './store';
import { CollabKitFirebaseApp, IdentifyProps, SetupProps, Target } from './constants';
import { getRandomColor } from './colors';

function timelineRef(threadId: string) {
  if (!store.config.setup?.appId) {
    throw new Error('no appId');
  }
  return ref(
    getDatabase(CollabKitFirebaseApp),
    `/timeline/${store.config.setup.appId}/${threadId}/`
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
  },

  identify: async (props: IdentifyProps) => {
    store.config.identify = props;
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
      if (!config.identify) {
        return;
      }

      const color = getRandomColor();
      const profile = { ...store.config.identify, color };

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
        const claimedMode = result.claims.mode;
        console.log('claimedMode', claimedMode);
        console.log('signed in', userCredential);
      } catch (e) {
        console.error('failed to sign in', e);
      }

      // todo handle spotty network
      try {
        // this should be an onValue sub
        const snapshot = await get(
          ref(getDatabase(CollabKitFirebaseApp), '/profiles/' + config.setup.appId)
        );
        snapshot.forEach((child) => {
          const profile = child.val();
          store.profiles[profile.id] = profile;
        });
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

  openThread: async (uuid: string) => {
    store.composers[uuid] = {
      body: '',
    };

    console.log('openThread', uuid, timelineRef(uuid).toString());

    if (store.subs[timelineRef(uuid).toString()]) {
      console.log('returing');
      return;
    }

    try {
      console.log((await get(timelineRef(uuid))).val());

      store.subs[timelineRef(uuid).toString()] = onChildAdded(
        timelineRef(uuid),
        events.onTimelineEventAdded
      );
    } catch (e) {
      console.error('onchildadded', e);
    }
  },

  changeComposer: (threadId: string, value: string) => {
    store.composers[threadId].body = value;
  },

  closeThread: (threadId: string) => {
    store.subs[timelineRef(threadId).toString()]?.();
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

  sendMessage: async (threadId: string) => {
    if (!store.config.identify) {
      console.warn('[CollabKit] Did you forget to call CollabKit.identify?');
      return;
    }

    const { body } = store.composers[threadId];

    console.log('sending message', body);
    // todo optimistic send
    try {
      const eventRef = await push(timelineRef(threadId), {
        type: 'message',
        body: body,
        createdAt: serverTimestamp(),
        createdById: store.config.identify.userId,
      });
      if (eventRef.key) {
        store.timelines['thread-1'][eventRef.key] = {
          body,
          createdById: 'user-1',
          createdAt: +Date.now(),
          type: 'message',
        };
      } else {
        console.error('failed to send message');
        // handle failure here
      }
      store.composers[threadId].body = '';
    } catch (e) {
      console.error(e);
      // handle failure here
    }
  },
};
