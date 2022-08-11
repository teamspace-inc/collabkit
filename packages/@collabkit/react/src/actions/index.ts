import debounce from 'lodash.debounce';

import { Store } from '../constants';
import { sendMessage } from './sendMessage';
import { startSelecting } from './startSelecting';
import { authenticate } from './authenticate';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { closeThread } from './closeThread';
import { monitorConnection } from './monitorConnection';
import { resolveThread } from './resolveThread';
import { saveProfile } from './saveProfile';
import { seen } from './seen';
import { stopSelecting } from './stopSelecting';
import { stopTyping } from './stopTyping';
import { subscribeInbox } from './subscribeInbox';
import { subscribeSeen } from './subscribeSeen';
import { toggleCommentReaction } from './toggleCommentReaction';
import { toggleEmojiReactionPicker } from './toggleEmojiReactionPicker';
import { placePinAndStartComposingThread } from './placePinAndStartComposingThread';
import { focus } from './focus';
import { blur } from './blur';
import { subscribeThread } from './subscribeThread';
import { reopenThread } from './reopenThread';
import { subscribePins } from './subscribePins';
import { subscribeWorkspace } from './subscribeWorkspace';
import { subscribeProfiles } from './subscribeProfiles';
import { removePendingPins } from './removePendingPins';
import { hover } from './hover';
import { unhover } from './unhover';
import { viewThread } from './viewThread';
import { isTyping } from './isTyping';
import { registerThread } from './registerThread';
import { saveThreadInfo } from './saveThreadInfo';

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

export function getConfig(store: Store) {
  const { config } = store;
  const appId = config.setup.appId;
  const apiKey = config.setup.apiKey;
  const mode = config.setup.mode;
  const userId = config.identify?.userId;
  const workspaceId = config.workspace.id;

  if (!appId) {
    throw new Error('Missing `appId`');
  }
  if (!apiKey) {
    throw new Error('Missing `apiKey`');
  }

  return { appId, apiKey, mode, userId, workspaceId };
}

export const actions = {
  monitorConnection,

  startThread: placePinAndStartComposingThread,

  subscribeInbox,

  stopTyping,

  closeThread,

  isTyping: debounce(isTyping, 1000, { leading: true, maxWait: 1000 }),

  stopSelecting,

  startSelecting,

  subscribeThread,

  seen,

  subscribeSeen,

  subscribeProfiles,

  saveProfile,

  authenticate,

  subscribePins,

  subscribeWorkspace,

  registerThread,

  focus,

  blur,

  toggleCommentReaction,

  toggleEmojiReactionPicker,

  closeEmojiReactionPicker,

  reopenThread,

  resolve: resolveThread,

  sendMessage,

  placePinAndStartComposingThread,

  removePendingPins,

  hover,

  unhover,

  viewThread,

  saveThreadInfo,
};
