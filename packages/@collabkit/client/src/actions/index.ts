import debounce from 'lodash.debounce';

import { attachPin } from './attachPin';
import { authenticate } from './authenticate';
import { blur } from './blur';
import { closeAllPopovers } from './closeAllPopovers';
import { closePopoverContent } from './closePopoverContent';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { closeMenu } from './closeMenu';
import { closePopoverPreview } from './closePopoverPreview';
import { collapseThread } from './collapseThread';
import { deleteMessage } from './deleteMessage';
import { deletePin } from './deletePin';
import { dragPin } from './dragPin';
import { deselectAll } from './deselectAll';
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
import { movePin } from './movePin';
import { openMenu } from './openMenu';
import { setPinVisibility } from './pinsVisible';
import { reopenThread } from './reopenThread';
import { resolveThread } from './resolveThread';
import { saveMentionableUsers } from './saveMentionableUsers';
import { saveProfile } from './saveProfile';
import { saveThreadInfo } from './saveThreadInfo';
import { seen } from './seen';
import { select } from './select';
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
import { subscribeOpenPins } from './subscribeOpenPins';
import { subscribeOpenThreads } from './subscribeOpenThreads';
import { subscribeProfile } from './subscribeProfile';
import { subscribeWorkspaceProfiles } from './subscribeWorkspaceProfiles';
import { subscribeSeen } from './subscribeSeen';
import { subscribeThread } from './subscribeThread';
import { subscribeWorkspace } from './subscribeWorkspace';
import { toggleEmoji } from './toggleEmoji';
import { toggleEmojiPicker } from './toggleEmojiPicker';
import { unhover } from './unhover';
import { updateComment } from './updateComment';
import { updateComposer } from './updateComposer';
import { viewContent } from './viewContent';

export const actions = {
  attachPin,
  authenticate,
  blur,
  closeAllPopovers,
  closeEmojiReactionPicker,
  closeMenu,
  closePopoverPreview,
  closePopoverContent,
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
  subscribeWorkspaceProfiles,
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
