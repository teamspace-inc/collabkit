import type {
  Config,
  Mention,
  MentionProps,
  Store,
  Subscriptions,
  Workspace,
} from '@collabkit/core';

import type { AvatarProps } from './types';
import type { CustomTheme } from './styles/themes.css';

import { CollabKitProvider } from './components/Provider';
import { PopoverTrigger, usePopoverThread } from './components/Popover';
import { Thread } from './components/Thread';
import { useUnreadCommentsCount } from './hooks/public/useUnreadCommentsCount';
import { useUnreadThreadsCount } from './hooks/public/useUnreadThreadsCount';
import { createValtioStore } from './store';
import { Inbox } from './components/Inbox';
import { InboxButton } from './components/InboxButton';
import { ThemeProvider } from './components/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { ThemeWrapper } from './components/ThemeWrapper';
import { SidebarInboxButton } from './components/SidebarInboxButton';
import { SidebarInbox } from './components/SidebarInbox';
import { PopoverThread } from './components/PopoverThread';
import { useInbox } from './hooks/public/useInbox';
import * as Comment from './components/Comment';
import * as Profile from './components/Profile';
import { ThreadProvider } from './components/ThreadProvider';

export {
  CollabKitProvider as Provider,
  CollabKitProvider,
  ThemeProvider,
  Thread,
  InboxButton,
  PopoverTrigger,
  ThemeWrapper,
  Inbox,
  Sidebar,
  SidebarInbox,
  SidebarInboxButton,
  PopoverThread as InternalPopoverThread,
  usePopoverThread,
  useUnreadThreadsCount,
  useUnreadCommentsCount,
  useUnreadCommentsCount as useUnreadCount,
  useInbox,
  createValtioStore as internal_createStore,
  // advanced
  ThreadProvider,
  Comment,
  Profile,
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
