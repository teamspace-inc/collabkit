import {
  get,
  set,
  ref,
  onChildAdded,
  push,
  serverTimestamp,
  onValue,
  update,
  DataSnapshot,
  onDisconnect,
  remove,
  onChildRemoved,
  query,
  orderByChild,
  limitToLast,
  onChildMoved,
} from 'firebase/database';

import { getAuth, signInWithCustomToken } from 'firebase/auth';
import {
  CollabKitFirebaseApp,
  CommentReactionTarget,
  CommentTarget,
  ComposerTarget,
  DB,
  Event,
  IdentifyProps,
  MentionProps,
  SetupProps,
  Store,
  Target,
} from './constants';

import { Color, getRandomColor } from './colors';
import { createEditor } from 'lexical';
import { createEditorConfig } from './components/Composer';
import { ref as valtioRef } from 'valtio';
import { createEvents, Events } from './events';

import debounce from 'lodash.debounce';

import { sendMessage } from './actions/sendMessage';

export function timelineRef(store: Store, workspaceId: string, threadId: string) {
  if (!store.config.setup?.appId) {
    throw new Error('no appId');
  }
  return ref(DB, `/timeline/${store.config.setup.appId}/${workspaceId}/${threadId}/`);
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
  const connectedRef = ref(DB, '.info/connected');
  store.subs['connectionState'] = onValue(connectedRef, (snapshot) => {
    if (!store.isConnected && snapshot.val()) {
      events.onConnectionStateChange(snapshot.val());
    }
  });
}

function initThread(store: Store, props: { workspaceId: string; threadId: string }) {
  store.workspaces[props.workspaceId] ||= {
    inbox: {},
    name: store.config.identify?.workspaceName || '',
    composers: {
      [props.threadId]: {
        editor: valtioRef(createEditor(createEditorConfig())),
        $$body: '',
        isTyping: {},
      },
    },
    timeline: {},
    seen: {},
    seenBy: {},
  };

  store.workspaces[props.workspaceId].composers[props.threadId] ||= {
    editor: valtioRef(createEditor(createEditorConfig())),
    $$body: '',
    isTyping: {},
  };
}

async function toggleCommentReaction(store: Store, props: { target: CommentReactionTarget }) {
  const { userId } = getConfig(store);

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
      createdById: userId,
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
}

async function loadThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const timeline = timelineRef(store, props.workspaceId, props.threadId);
  const appId = store.config.setup?.appId;
  const userId = store.config.identify?.userId;

  if (!appId || !userId) {
    return;
  }

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

  subscribeThreadIsTyping(store, props.workspaceId, props.threadId);
  subscribeThreadSeenBy(store, { appId, userId, ...props });
}

function subscribeThreadSeenBy(
  store: Store,
  props: {
    appId: string;
    userId: string;
    workspaceId: string;
    threadId: string;
  }
) {
  const seenByQuery = query(
    ref(DB, `/views/seenBy/${props.appId}/${props.workspaceId}/${props.threadId}`),
    orderByChild('seenUntilId')
  );
  store.subs[`${props.workspaceId}-${props.threadId}-threadSeenBy`] ||= onChildMoved(
    seenByQuery,
    (snapshot) => {
      const userId = snapshot.key;
      if (!userId) {
        return;
      }
      store.workspaces[props.workspaceId].seenBy[props.threadId] ||= {};
      store.workspaces[props.workspaceId].seenBy[props.threadId][userId] = snapshot.val();
    }
  );
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
      ref(DB, `/profiles/${store.config.setup.appId}/`),
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

function subscribeThreadIsTyping(store: Store, workspaceId: string, threadId: string) {
  if (!store.config.identify?.userId) {
    return;
  }

  const key = `isTyping-${workspaceId}/${threadId}`;
  const addedKey = `${key}-added`;
  const removedKey = `${key}-removed`;

  onDisconnect(
    ref(DB, `/isTyping/${workspaceId}/${threadId}/${store.config.identify?.userId}`)
  ).remove();

  if (store.subs[addedKey] && store.subs[removedKey]) {
    return;
  }

  const isTypingRef = ref(DB, `/isTyping/${store.config.setup?.appId}/${workspaceId}/${threadId}`);

  try {
    store.subs[addedKey] = onChildAdded(isTypingRef, (snapshot) => {
      const userId = snapshot.key;
      if (userId) {
        store.workspaces[workspaceId].composers[threadId].isTyping[userId] = true;
      }
    });
    store.subs[removedKey] = onChildRemoved(isTypingRef, (snapshot) => {
      const userId = snapshot.key;
      if (userId) {
        store.workspaces[workspaceId].composers[threadId].isTyping[userId] = false;
      }
    });
  } catch (e) {
    console.error(e);
  }
}

function unloadThread(store: Store, props: { workspaceId: string; threadId: string }) {
  store.subs[timelineRef(store, props.workspaceId, props.threadId).toString()]?.();
}

async function saveProfile(store: Store) {
  const { workspaceId, appId, userId } = getConfig(store);
  const { config } = store;

  try {
    const color = getRandomColor();

    let profile: Partial<IdentifyProps> & { color: Color } = { ...config.identify, color };

    delete profile.workspaceId;
    delete profile.workspaceName;
    delete profile.userId;

    let workspace: Pick<IdentifyProps, 'workspaceId' | 'workspaceName'> = {
      workspaceId,
    };

    // only if the user has explicitly passed workspaceName do
    // we want to apply it as a change
    if (config.identify?.hasOwnProperty('workspaceName')) {
      workspace.workspaceName = config.identify.workspaceName;
    }

    await update(ref(DB, `/workspaces/${appId}/${workspaceId}/`), workspace);

    await set(ref(DB, `/workspaces/${appId}/${workspaceId}/profiles/${userId}`), true);

    await set(ref(DB, `/profiles/${appId}/${userId}`), profile);

    store.profiles[userId] = profile;

    if (store.appState === 'config') {
      store.appState = 'ready';
    }
  } catch (e) {
    console.error(e);
  }
}

async function open(store: Store, workspaceId: string, threadId: string) {
  const { userId } = getConfig(store);
  // todo optimistic send
  try {
    const event: Event = {
      type: 'system',
      body: '',
      system: 'reopen',
      createdAt: serverTimestamp(),
      createdById: userId,
    };
    const eventRef = await push(timelineRef(store, workspaceId, threadId), event);
    if (eventRef.key) {
      store.workspaces[workspaceId].timeline[threadId] ||= {};
      store.workspaces[workspaceId].timeline[threadId][eventRef.key] = {
        ...event,
        createdAt: +Date.now(),
      };
      actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
    } else {
      console.error('CollabKit: failed to open thread');
      // handle failure here
    }
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}

async function seen(store: Store, target: CommentTarget) {
  const { appId, userId } = getConfig(store);

  const { workspaceId, threadId, eventId } = target;
  const lastSeenId = store.workspaces[workspaceId].seen[threadId];
  const isNewer = lastSeenId ? eventId > lastSeenId : true;

  if (isNewer) {
    store.workspaces[workspaceId].seen[threadId] = eventId;

    console.log('SEEN', eventId, threadId, workspaceId);

    const data = {
      seenUntilId: eventId,
      seenAt: serverTimestamp(),
    };

    try {
      await update(ref(DB), {
        [`/seen/${appId}/${userId}/${workspaceId}/${threadId}/`]: data,
        [`/views/seenBy/${appId}/${workspaceId}/${threadId}/${userId}`]: data,
      });
    } catch (e) {
      // error is expected if already seen
      // console.error(e);
    }
  }
}

function focus(store: Store, target: Target) {
  store.focusedId = target;
}

function blur(store: Store, target: Target) {
  store.focusedId = null;
}

async function resolve(store: Store, workspaceId: string, threadId: string) {
  const { userId } = getConfig(store);

  // todo optimistic send
  try {
    const event: Event = {
      type: 'system',
      body: '',
      system: 'resolve',
      createdAt: serverTimestamp(),
      createdById: userId,
    };
    const eventRef = await push(timelineRef(store, workspaceId, threadId), event);
    if (eventRef.key) {
      store.workspaces[workspaceId].timeline[threadId] ||= {};
      store.workspaces[workspaceId].timeline[threadId][eventRef.key] = {
        ...event,
        createdAt: +Date.now(),
      };
      actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
    } else {
      console.error('CollabKit: failed to resolve thread');
      // handle failure here
    }
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}

function getIsTypingRef(appId: string, workspaceId: string, threadId: string, userId: string) {
  return ref(DB, `/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`);
}

async function stopTyping(store: Store, props: { target: ComposerTarget }) {
  const { userId, appId } = getConfig(store);

  const timeoutID =
    store.workspaces[props.target.workspaceId].composers[props.target.threadId].isTypingTimeoutID;

  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  await remove(getIsTypingRef(appId, props.target.workspaceId, props.target.threadId, userId));
}

async function subscribeSeen(store: Store) {
  const { appId, workspaceId, userId } = getConfig(store);

  const seenQuery = query(
    ref(DB, `/seen/${appId}/${userId}/${workspaceId}`),
    orderByChild('seenUntilId'),
    limitToLast(20)
  );

  function childCallback(snapshot: DataSnapshot) {
    const threadId = snapshot.key;
    if (threadId && workspaceId) {
      const { seenUntilId } = snapshot.val();
      store.workspaces[workspaceId].seen[threadId] = seenUntilId;
    } else {
      console.log('no kley');
    }
  }

  store.subs[`${appId}-${workspaceId}-seen-added`] ||= onChildAdded(
    seenQuery,
    childCallback,
    (error) => {
      console.error('seen: ', error);
    }
  );

  store.subs[`${appId}-${workspaceId}-seen-moved`] ||= onChildMoved(
    seenQuery,
    childCallback,
    (error) => {
      console.error('seen: ', error);
    }
  );
}

function getConfig(store: Store) {
  const { config } = store;
  if (!config.setup) {
    console.warn('Did you forget to call `CollabKit.setup`?');
    throw new Error('Did you forget to call `CollabKit.setup`?');
  }

  const appId = config.setup.appId;
  const workspaceId = config.identify?.workspaceId;
  const apiKey = config.setup.apiKey;
  const mode = config.setup.mode;
  const userId = config.identify?.userId;

  if (!appId || !workspaceId || !apiKey || !mode || !userId) {
    throw new Error('Did you forget to call `CollabKit.setup`?');
  }
  return { appId, workspaceId, apiKey, mode, userId };
}

async function subscribeInbox(store: Store) {
  const { appId, workspaceId } = getConfig(store);

  console.log('Subscribing to Inbox');

  const inboxRef = query(
    ref(DB, `views/inbox/${appId}/${workspaceId}`),
    orderByChild('createdAt'),
    limitToLast(20)
  );

  function childCallback(snapshot: DataSnapshot, prevChildName?: string | null) {
    if (!workspaceId) {
      return;
    }

    const threadId = snapshot.key;

    if (!threadId) {
      return;
    }

    console.log('#inbox', threadId, prevChildName);

    const event = snapshot.val();
    store.workspaces[workspaceId].inbox[threadId] = { ...event, id: snapshot.key };
  }

  store.subs['inbox#added'] ||= onChildAdded(inboxRef, childCallback, (error) => {
    console.error('Error subscribing to Inbox', error);
  });

  store.subs['inbox#moved'] ||= onChildMoved(inboxRef, childCallback, (error) => {
    console.error('Error subscribing to Inbox', error);
  });
}

async function authenticate(store: Store) {
  const { appId, workspaceId, apiKey, mode } = getConfig(store);
  const auth = await generateToken(appId, apiKey, mode);

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
      const snapshot = await get(ref(DB, `/profiles/${appId}/${workspaceId}`));
      if (snapshot.key) {
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
}

function toggleEmojiReactionPicker(store: Store, props: { target: CommentTarget }) {
  store.reactingId = props.target;
}

function closeEmojiReactionPicker(store: Store) {
  store.reactingId = null;
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

async function setup(store: Store, events: Events, props: SetupProps) {
  store.appState = 'config';
  store.config.setup = props;
  monitorConnection(store, events);
}

async function identify(store: Store, props: IdentifyProps) {
  store.config.identify = props;
  // todo extract this
  store.workspaces[props.workspaceId] ||= {
    inbox: {},
    name: store.config.identify.workspaceName || '',
    timeline: {},
    composers: {},
    seen: {},
    seenBy: {},
  };
}

function mentions(store: Store, props: MentionProps) {
  store.config.mentions = props;
}

function toggleThread(store: Store, props: { workspaceId: string; threadId: string }) {
  initThread(store, props);
  loadThread(store, props);
}

export const actions = {
  setup,

  identify,

  mentions,

  toggleThread,

  subscribeInbox,

  stopTyping,

  isTyping: debounce(
    async (store: Store, props: { target: ComposerTarget }) => {
      const { config } = store;

      if (!config.setup || !config.identify?.workspaceId) {
        return;
      }

      const isTypingRef = ref(
        DB,
        `/isTyping/${config.setup.appId}/${props.target.workspaceId}/${props.target.threadId}/${config.identify.userId}`
      );

      const timeoutID =
        store.workspaces[props.target.workspaceId].composers[props.target.threadId]
          .isTypingTimeoutID;

      if (timeoutID) {
        clearTimeout(timeoutID);
      }

      await set(isTypingRef, true);
      store.workspaces[props.target.workspaceId].composers[
        props.target.threadId
      ].isTypingTimeoutID = setTimeout(() => {
        remove(isTypingRef);
      }, 1000);
    },
    1000,
    { leading: true, maxWait: 1000 }
  ),

  seen,

  subscribeSeen,

  subscribeProfiles,

  saveProfile,

  authenticate,

  focus,

  blur,

  unloadThread,

  toggleCommentReaction,

  toggleEmojiReactionPicker,

  closeEmojiReactionPicker,

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

  open,

  resolve,

  sendMessage,
};
