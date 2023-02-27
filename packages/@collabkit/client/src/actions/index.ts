import debounce from 'lodash.debounce';

import { attachComposerPin } from './attachComposerPin';
import { authenticate } from './authenticate';
import { blur } from './blur';
import { closeAllPopovers } from './closeAllPopovers';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { closeMenu } from './closeMenu';
import { closePopoverContent } from './closePopoverContent';
import { closePopoverPreview } from './closePopoverPreview';
import { collapseThread } from './collapseThread';
import { deleteMessage } from './deleteMessage';
import { deletePin } from './deletePin';
import { deselectAll } from './deselectAll';
import { dragPin } from './dragPin';
import { expandThread } from './expandThread';
import { focus } from './focus';
import { focusComposer } from './focusComposer';
import { hideSidebar } from './hideSidebar';
import { hover } from './hover';
import { init } from './init';
import { initComposer } from './initComposer';
import { initThread } from './initThread';
import { insertComposerPin } from './insertComposerPin';
import { isTyping } from './isTyping';
import { monitorConnection } from './monitorConnection';
import { openInboxItem } from './openInboxItem';
import { openMenu } from './openMenu';
import { removeAttachment } from './removeAttachment';
import { reopenThread } from './reopenThread';
import { resolveThread } from './resolveThread';
import { saveMentionableUsers } from './saveMentionableUsers';
import { saveProfile } from './saveProfile';
import { saveThreadInfo } from './saveThreadInfo';
import { seen } from './seen';
import { select } from './select';
import { sendMessage } from './sendMessage';
import { setAvatarError } from './setAvatarError';
import { setComposer } from './setComposer';
import { setPinVisibility } from './pinsVisible';
import { showPreview } from './showPreview';
import { showSidebar } from './showSidebar';
import { startEditing } from './startEditing';
import { startMentioning } from './startMentioning';
import { startSelecting } from './startSelecting';
import { stopEditing } from './stopEditing';
import { stopSelecting } from './stopSelecting';
import { stopTyping } from './stopTyping';
import { subscribeInbox } from './subscribeInbox';
import { subscribeOpenPins } from './subscribeOpenPins';
import { subscribeProfile } from './subscribeProfile';
import { subscribeSeen } from './subscribeSeen';
import { subscribeThread } from './subscribeThread';
import { subscribeWorkspace } from './subscribeWorkspace';
import { subscribeWorkspaceProfiles } from './subscribeWorkspaceProfiles';
import { toggleEmoji } from './toggleEmoji';
import { toggleEmojiPicker } from './toggleEmojiPicker';
import { unhover } from './unhover';
import { updateComment } from './updateComment';
import { updateComposer } from './updateComposer';
import { viewContent } from './viewContent';
import { toggleSidebar } from './toggleSidebar';

export const actions = {
  attachComposerPin,
  authenticate,
  blur,
  closeAllPopovers,
  closeEmojiReactionPicker,
  closeMenu,
  closePopoverContent,
  closePopoverPreview,
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
  initThread,
  insertComposerPin,
  isTyping: debounce(isTyping, 1000, { leading: true, maxWait: 1000 }),
  monitorConnection,
  openInboxItem,
  openMenu,
  removeAttachment,
  reopenThread,
  resolveThread,
  saveMentionableUsers,
  saveProfile,
  saveThreadInfo,
  seen,
  select,
  sendMessage,
  setAvatarError,
  setComposer,
  setPinVisibility,
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
  subscribeProfile,
  subscribeSeen,
  subscribeThread,
  subscribeWorkspace,
  subscribeWorkspaceProfiles,
  toggleEmoji,
  toggleEmojiPicker,
  toggleSidebar,
  unhover,
  updateComment,
  updateComposer,
  viewContent,
};
