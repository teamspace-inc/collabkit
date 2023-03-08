import type { Config, Store } from '@collabkit/core';
import { saveMentionableUsers } from './saveMentionableUsers';

export function setConfig(store: Store, config: Config) {
  // Update the callbacks in the store
  const callbacks = store.callbacks;
  callbacks.onAuthenticationRequired = config.onAuthenticationRequired;
  callbacks.onPinClick = config.onPinClick;
  callbacks.onPinHover = config.onPinHover;
  callbacks.onPinUnhover = config.onPinUnhover;
  callbacks.onPinDeselect = config.onPinDeselect;
  callbacks.onPinAttach = config.onPinAttach;
  callbacks.onThreadCreated = config.onThreadCreated;
  callbacks.onCommentSend = config.onCommentSend;
  callbacks.onTimestampClick = config.onTimestampClick;
  callbacks.onMentionClick = config.onMentionClick;
  callbacks.onInboxThreadClick = config.onInboxThreadClick;
  callbacks.onThreadResolve = config.onThreadResolve;
  callbacks.onThreadReopen = config.onThreadReopen;
  callbacks.onInboxCloseButtonClick = config.onInboxCloseButtonClick;

  if (config.mentionableUsers !== store.config.mentionableUsers) {
    saveMentionableUsers(store, config.mentionableUsers);
  }
}
