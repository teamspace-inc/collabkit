import type {
  Config,
  Mention,
  MentionProps,
  Store,
  Subscriptions,
  Workspace,
} from '@collabkit/core';

import type { CustomTheme } from '@collabkit/theme';
import type { AvatarProps } from './types';

import { CollabKitProvider } from './components/Provider';
import { PopoverTrigger, usePopoverThread } from './components/Popover';
import { Thread } from './components/Thread';
import { useUnreadCount } from './hooks/public/useUnreadCount';
import { useUnreadThreadsCount } from './hooks/public/useUnreadThreadsCount';
import { createValtioStore } from './store';
import { Inbox } from './components/Inbox';
import { InboxButton } from './components/InboxButton';
import { SidePane } from './components/SidePane';

export {
  CollabKitProvider as Provider,
  CollabKitProvider,
  Thread,
  InboxButton,
  PopoverTrigger,
  Inbox,
  SidePane,
  usePopoverThread,
  useUnreadThreadsCount,
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
