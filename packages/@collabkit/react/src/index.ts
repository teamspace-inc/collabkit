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
import { AltPopoverThread } from './components/AltPopoverThread';
import { useInbox } from './hooks/public/useInbox';
import * as Comment from './components/Comment';
import * as Profile from './components/Profile';
import { ThreadProvider } from './components/ThreadProvider';
import { useComments } from './hooks/public/useComments';
import { useIsResolved } from './hooks/public/useIsResolved';
import { useResolveThread } from './hooks/public/useResolveThread';
import { useThreadUsers } from './hooks/public/useThreadUsers';
import { ThreadFacepile } from './components/ThreadFacepile';
import { useReplyCount } from './hooks/useReplyCount';

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
  useUnreadCommentsCount as useUnreadCount,
  createValtioStore as internal_createStore,
  // advanced
  ThreadFacepile,
  useInbox,
  useComments,
  useIsResolved,
  useThreadUsers,
  useResolveThread,
  useReplyCount,
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
