import type {
  Config,
  Mention,
  MentionProps,
  Store,
  Subscriptions,
  Workspace,
} from '@collabkit/core';

import type { AvatarProps, CommentProps, ThreadProps } from './types';
import type { CustomTheme } from './theme/themes.css';

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
import { useIsResolved } from './hooks/public/useIsResolved';
import { useResolveThread } from './hooks/public/useResolveThread';
import { useThreadUsers } from './hooks/public/useThreadUsers';
import { useComposer } from './hooks/public/useComposer';
import { ThreadFacepile } from './components/ThreadFacepile';
import { useReplyCount } from './hooks/useReplyCount';
import { usePopoverThread } from './hooks/usePopoverThread';
import { useCommentableRef } from './hooks/useCommentableRef';
import { Comment } from './components/Comment';
import CollabKitRecharts from './components/Recharts';
import { Profile } from './components/Profile';
import { Composer } from './components/composer/Composer';
import { Scrollable } from './components/Scrollable';
import { CommentList } from './components/CommentList';
import { Popover } from './components/Popover';
import { Button } from './components/Button';
import { Commentable } from './components/Commentable';

export * from './components/Comment';
export * from './components/composer/Composer';
export * from './components/Inbox';
export * from './components/InboxButton';
export * from './components/PopoverThread';
export * from './components/Provider';
export * from './components/Sidebar';
export * from './components/SidebarInbox';
export * from './components/SidebarInboxButton';
export * from './components/Thread';
export * from './components/ThreadFacepile';
export * from './components/ThemeContext';
export * from './components/ThemeWrapper';
export * from './components/Recharts';
export * from './components/Profile';
export * from './components/Scrollable';
export * from './components/CommentList';
export * from './components/Popover';
export * from './components/Button';
export * from './components/Commentable';
export * from './components/Markdown';
export * from './components/Channel';

import { Markdown } from './components/Markdown';
import { useThread } from './hooks/public/useThread';
import { Debug } from './components/Debug';
import { Channel } from './components/Channel';

export {
  CollabKitProvider as Provider,
  CollabKitProvider,
  CollabKitRecharts,
  Inbox,
  InboxButton,
  Markdown,
  Commentable,
  PopoverThread,
  Sidebar,
  SidebarInbox,
  SidebarInboxButton,
  ThemeProvider,
  ThemeWrapper,
  Thread,
  Channel,
  useCommentableRef,
  useUnreadCommentsCount as useUnreadCount,
  useUnreadThreadsCount,
  // advanced
  Button,
  Comment,
  CommentList,
  Composer,
  Debug,
  Popover,
  Profile,
  Scrollable,
  ThreadFacepile,
  useIsResolved,
  usePopoverThread,
  useReplyCount,
  useResolveThread,
  useThreadUsers,
  useThread,
  useComposer,
  // internal
  createValtioStore as internal_createStore,
  PopoverThreadContent as InternalPopoverThreadContent,
};

export type {
  AvatarProps,
  CommentProps,
  Config,
  CustomTheme,
  Mention,
  MentionProps,
  PopoverThreadProps,
  Store,
  Subscriptions,
  ThreadProps,
  Workspace,
};
