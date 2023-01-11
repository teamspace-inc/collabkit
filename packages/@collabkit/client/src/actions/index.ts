import debounce from 'lodash.debounce';

import type { Store } from '@collabkit/core';
import { sendMessage } from './sendMessage';
import { startSelecting } from './startSelecting';
import { authenticate } from './authenticate';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { closeThread } from './closeThread';
import { closePreview } from './closePreview';
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
import { focus } from './focus';
import { blur } from './blur';
import { subscribeThread } from './subscribeThread';
import { reopenThread } from './reopenThread';
import { subscribeProfile } from './subscribeProfile';
import { subscribeOpenThreads } from './subscribeOpenThreads';
import { subscribeWorkspace } from './subscribeWorkspace';
import { subscribeProfiles } from './subscribeProfiles';
import { hover } from './hover';
import { unhover } from './unhover';
import { viewThread } from './viewThread';
import { isTyping } from './isTyping';
import { showPreview } from './showPreview';

import { saveThreadInfo } from './saveThreadInfo';
import { init } from './init';
import { saveMentionableUsers } from './saveMentionableUsers';
import { enableComposerCommentButton } from './enableComposerCommentButton';
import { disableComposerCommentButton } from './disableComposerCommentButton';
import { deleteMessage } from './deleteMessage';
import { startEditing } from './startEditing';
import { stopEditing } from './stopEditing';
import { updateComment } from './updateComment';
import { showSidebar } from './showSidebar';
import { hideSidebar } from './hideSidebar';
import { setAvatarError } from './setAvatarError';
import { closeMenu } from './closeMenu';
import { openMenu } from './openMenu';
import { closeAll } from './closeAll';
import { insertComposerPin } from './insertComposerPin';
import { toggleComposerMentions } from './toggleComposerMentionsPicker';

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
  closeAll,
  closeEmojiReactionPicker,
  closeMenu,
  closePreview,
  closeThread,
  deleteMessage,
  disableComposerCommentButton,
  enableComposerCommentButton,
  focus,
  hideSidebar,
  hover,
  init,
  insertComposerPin,
  isTyping: debounce(isTyping, 1000, { leading: true, maxWait: 1000 }),
  monitorConnection,
  openMenu,
  reopenThread,
  resolveThread,
  saveMentionableUsers,
  saveProfile,
  saveThreadInfo,
  seen,
  sendMessage,
  setAvatarError,
  showPreview,
  showSidebar,
  startEditing,
  startSelecting,
  stopEditing,
  stopSelecting,
  stopTyping,
  subscribeInbox,
  subscribeOpenThreads,
  subscribeProfile,
  subscribeProfiles,
  subscribeSeen,
  subscribeThread,
  subscribeWorkspace,
  toggleCommentReaction,
  toggleComposerMentionsPicker: toggleComposerMentions,
  toggleEmojiReactionPicker,
  unhover,
  updateComment,
  viewThread,
};
