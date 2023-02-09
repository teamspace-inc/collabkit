import debounce from 'lodash.debounce';

import type { Store } from '@collabkit/core';

import { attachPin } from './attachPin';
import { authenticate } from './authenticate';
import { blur } from './blur';
import { closeAll } from './closeAll';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { closeMenu } from './closeMenu';
import { closePreview } from './closePreview';
import { closeContent } from './closeContent';
import { deleteMessage } from './deleteMessage';
import { deletePin } from './deletePin';
import { dragPin } from './dragPin';
import { focus } from './focus';
import { hideSidebar } from './hideSidebar';
import { init } from './init';
import { initComposer } from './initComposer';
import { insertComposerPin } from './insertComposerPin';
import { isTyping } from './isTyping';
import { monitorConnection } from './monitorConnection';
import { movePin } from './movePin';
import { openMenu } from './openMenu';
import { setPinVisibility } from './pinsVisible';
import { reopenThread } from './reopenThread';
import { resolveThread } from './resolveThread';
import { saveMentionableUsers } from './saveMentionableUsers';
import { saveProfile } from './saveProfile';
import { saveThreadInfo } from './saveThreadInfo';
import { seen } from './seen';
import { sendMessage } from './sendMessage';
import { setAvatarError } from './setAvatarError';
import { showPreview } from './showPreview';
import { showSidebar } from './showSidebar';
import { startEditing } from './startEditing';
import { startMentioning } from './startMentioning';
import { startSelecting } from './startSelecting';
import { stopEditing } from './stopEditing';
import { stopSelecting } from './stopSelecting';
import { stopTyping } from './stopTyping';
import { subscribeInbox } from './subscribeInbox';
import { subscribeOpenThreads } from './subscribeOpenThreads';
import { subscribeProfile } from './subscribeProfile';
import { subscribeProfiles } from './subscribeProfiles';
import { subscribeSeen } from './subscribeSeen';
import { subscribeThread } from './subscribeThread';
import { subscribeWorkspace } from './subscribeWorkspace';
import { toggleEmoji } from './toggleEmoji';
import { toggleEmojiPicker } from './toggleEmojiPicker';
import { updateComment } from './updateComment';
import { viewContent } from './viewContent';
import { subscribeOpenPins } from './subscribeOpenPins';
import { focusComposer } from './focusComposer';
import { select } from './select';
import { deselectAll } from './deselectAll';
import { updateComposer } from './updateComposer';
import { expandThread } from './expandThread';
import { collapseThread } from './collapseThread';
import { hover } from './hover';
import { unhover } from './unhover';

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
  attachPin,
  authenticate,
  blur,
  closeAll,
  closeEmojiReactionPicker,
  closeMenu,
  closePreview,
  closeThread: closeContent,
  collapseThread,
  deleteMessage,
  deletePin,
  deselectAll,
  dragPin,
  expandThread,
  focus,
  focusComposer,
  hideSidebar,
  hover,
  init,
  initComposer,
  insertComposerPin,
  isTyping: debounce(isTyping, 1000, { leading: true, maxWait: 1000 }),
  monitorConnection,
  movePin,
  openMenu,
  setPinVisibility,
  reopenThread,
  resolveThread,
  saveMentionableUsers,
  saveProfile,
  saveThreadInfo,
  seen,
  select,
  sendMessage,
  setAvatarError,
  showPreview,
  showSidebar,
  startEditing,
  startMentioning,
  startSelecting,
  stopEditing,
  stopSelecting,
  stopTyping,
  subscribeInbox,
  subscribeOpenPins,
  subscribeOpenThreads,
  subscribeProfile,
  subscribeProfiles,
  subscribeSeen,
  subscribeThread,
  subscribeWorkspace,
  toggleEmoji,
  toggleEmojiPicker,
  unhover,
  updateComment,
  updateComposer,
  viewContent,
};
