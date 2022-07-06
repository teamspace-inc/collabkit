import { set, ref, remove } from 'firebase/database';

import { ComposerTarget, DB, Store } from '../constants';

import debounce from 'lodash.debounce';

import { sendMessage } from './sendMessage';
import { startSelecting } from './startSelecting';
import { authenticate } from './authenticate';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { closeThread } from './closeThread';
import { identify } from './identify';
import { mentions } from './mentions';
import { resolve } from './resolve';
import { saveProfile } from './saveProfile';
import { seen } from './seen';
import { setup } from './setup';
import { stopSelecting } from './stopSelecting';
import { stopTyping } from './stopTyping';
import { subscribeInbox } from './subscribeInbox';
import { subscribeProfiles } from './subscribeProfiles';
import { subscribeSeen } from './subscribeSeen';
import { toggleCommentReaction } from './toggleCommentReaction';
import { toggleEmojiReactionPicker } from './toggleEmojiReactionPicker';
import { startThread } from './startThread';
import { unloadThread } from './unloadThread';
import { focus } from './focus';
import { blur } from './blur';
import { reopenThread } from './reopenThread';

export function timelineRef(store: Store, workspaceId: string, threadId: string) {
  if (!store.config.setup?.appId) {
    throw new Error('no appId');
  }
  return ref(DB, `/timeline/${store.config.setup.appId}/${workspaceId}/${threadId}/`);
}

export type GenerateToken =
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

export type FunctionResponse<T> =
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

export function getIsTypingRef(
  appId: string,
  workspaceId: string,
  threadId: string,
  userId: string
) {
  return ref(DB, `/isTyping/${appId}/${workspaceId}/${threadId}/${userId}`);
}

export function getConfig(store: Store) {
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

export const actions = {
  setup,

  identify,

  mentions,

  startThread,

  subscribeInbox,

  stopTyping,

  closeThread,

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

  stopSelecting,

  startSelecting,

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

  reopenThread,

  resolve,

  sendMessage,
};
