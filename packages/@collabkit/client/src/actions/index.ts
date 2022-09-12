import debounce from 'lodash.debounce';

import type { Store } from '@collabkit/core';
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
import { subscribeOpenThreads } from './subscribeOpenThreads';
import { subscribePins } from './subscribePins';
import { subscribeWorkspace } from './subscribeWorkspace';
import { subscribeProfiles } from './subscribeProfiles';
import { removePendingPins } from './removePendingPins';
import { hover } from './hover';
import { unhover } from './unhover';
import { viewThread } from './viewThread';
import { isTyping } from './isTyping';
import { saveThreadInfo } from './saveThreadInfo';
import { init } from './init';
import { saveMentionableUsers } from './saveMentionableUsers';
import { enableSendButton } from './enableSendButton';
import { disableSendButton } from './disableSendButton';
import { deleteMessage } from './deleteMessage';
import { startEditing } from './startEditing';
import { stopEditing } from './stopEditing';
import { updateComment } from './updateComment';
import { showInbox } from './showInbox';
import { hideInbox } from './hideInbox';

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
      workspaceId: string;
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

// normalises config across secure and unsecure modes for
// safe access from actions
export function getConfig(store: Store) {
  const { config } = store;
  const appId = config.appId;
  const apiKey = 'apiKey' in config ? config.apiKey : null;
  const token = 'token' in config ? config.token : null;
  const mode = token ? 'SECURED' : 'UNSECURED';
  const userId = store.userId;
  const workspaceId = store.workspaceId;

  if (!appId) {
    throw new Error('Missing `appId`');
  }
  if (mode === 'UNSECURED' && !apiKey) {
    throw new Error('Missing `apiKey`');
  }

  if (!userId) {
    throw new Error('Missing `userId`');
  }

  if (!workspaceId) {
    throw new Error('Missing `workspaceId`');
  }

  return { appId, apiKey, token, mode, userId, workspaceId };
}

export const actions = {
  authenticate,
  blur,
  closeEmojiReactionPicker,
  closeThread,
  deleteMessage,
  disableSendButton,
  enableSendButton,
  focus,
  hover,
  init,
  isTyping: debounce(isTyping, 1000, { leading: true, maxWait: 1000 }),
  monitorConnection,
  placePinAndStartComposingThread,
  removePendingPins,
  reopenThread,
  resolveThread,
  saveMentionableUsers,
  saveProfile,
  saveThreadInfo,
  seen,
  sendMessage,
  startEditing,
  startSelecting,
  startThread: placePinAndStartComposingThread,
  stopSelecting,
  stopEditing,
  stopTyping,
  subscribeInbox,
  subscribeOpenThreads,
  subscribePins,
  subscribeProfiles,
  subscribeSeen,
  subscribeThread,
  subscribeWorkspace,
  toggleCommentReaction,
  toggleEmojiReactionPicker,
  unhover,
  updateComment,
  viewThread,
  showInbox,
  hideInbox,
};
