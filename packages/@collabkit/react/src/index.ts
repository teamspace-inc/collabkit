import type {
  Config,
  Mention,
  MentionProps,
  Store,
  Subscriptions,
  Workspace,
} from '@collabkit/core';
import type { CustomTheme } from '@collabkit/theme';
import { CollabKitProvider } from './components/Provider';
import type { AvatarProps } from './types';
import { PopoverTrigger, usePopoverThread } from './components/Popover';
import { Thread } from './components/Thread';
import { useUnreadCount } from './hooks/public/useUnreadCount';
import { createValtioStore } from './store';
import { Inbox } from './components/Inbox';

export {
  CollabKitProvider as Provider,
  CollabKitProvider,
  Thread,
  PopoverTrigger,
  Inbox,
  usePopoverThread,
  useUnreadCount,
  createValtioStore as internal_createStore,
};
export type {
  AvatarProps,
  Config,
  Mention,
  MentionProps,
  Store,
  Subscriptions,
  CustomTheme,
  Workspace,
};
