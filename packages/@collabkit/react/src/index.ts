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
import {
  PopoverThread,
  PopoverThreadProps,
  PopoverThreadContent,
} from './components/PopoverThread';
import { useInbox } from './hooks/public/useInbox';
import { ThreadProvider } from './components/ThreadProvider';
import { useComments } from './hooks/public/useComments';
import { useIsResolved } from './hooks/public/useIsResolved';
import { useResolveThread } from './hooks/public/useResolveThread';
import { useThreadUsers } from './hooks/public/useThreadUsers';
import { ThreadFacepile } from './components/ThreadFacepile';
import { useReplyCount } from './hooks/useReplyCount';
import { ResolveThreadIconButton } from './components/ResolveThreadIconButton';
import { usePopoverThread } from './hooks/usePopoverThread';

import Comment, { CommentProps } from './components/Comment';
import CollabKitRecharts from './components/Recharts';
import Profile from './components/Profile';
import Composer from './components/composer/Composer';
import { Scrollable } from './components/Scrollable';
import CommentList from './components/CommentList';
import { Popover } from './components/Popover';

export {
  CollabKitProvider as Provider,
  CollabKitProvider,
  ThemeProvider,
  Thread,
  InboxButton,
  ThemeWrapper,
  Inbox,
  CollabKitRecharts,
  Sidebar,
  SidebarInbox,
  SidebarInboxButton,
  PopoverThread,
  useUnreadThreadsCount,
  useUnreadCommentsCount as useUnreadCount,
  // advanced
  Comment,
  CommentList,
  Composer,
  Popover,
  Profile,
  ResolveThreadIconButton,
  Scrollable,
  ThreadFacepile,
  ThreadProvider,
  useComments,
  useInbox,
  useIsResolved,
  usePopoverThread,
  useReplyCount,
  useResolveThread,
  useThreadUsers,
  // internal
  createValtioStore as internal_createStore,
  PopoverThreadContent as InternalPopoverThreadContent,
};

export type {
  AvatarProps,
  Config,
  Mention,
  MentionProps,
  PopoverThreadProps,
  Store,
  Subscriptions,
  CommentProps,
  CustomTheme,
  Workspace,
};
