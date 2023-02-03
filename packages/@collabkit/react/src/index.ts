import type {
  Config,
  Mention,
  MentionProps,
  Store,
  Subscriptions,
  Workspace,
} from '@collabkit/core';

import type { AvatarProps, ThreadProps } from './types';
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
import { useInbox } from './hooks/public/useInbox';
import { ThreadProvider } from './components/ThreadProvider';
import { useComments } from './hooks/public/useComments';
import { useIsResolved } from './hooks/public/useIsResolved';
import { useResolveThread } from './hooks/public/useResolveThread';
import { useThreadUsers } from './hooks/public/useThreadUsers';
import { useComposer } from './hooks/public/useComposer';
import { ThreadFacepile } from './components/ThreadFacepile';
import { useReplyCount } from './hooks/useReplyCount';
import { ResolveThreadIconButton } from './components/ResolveThreadIconButton';
import { usePopoverThread } from './hooks/usePopoverThread';
import { useCommentableRef } from './hooks/useCommentableRef';
import Comment, { CommentProps } from './components/Comment';
import CollabKitRecharts from './components/Recharts';
import Profile from './components/Profile';
import Composer from './components/composer/Composer';
import { Scrollable } from './components/Scrollable';
import CommentList from './components/CommentList';
import { Popover } from './components/Popover';
import { Button } from './components/Button';
import { Commentable } from './components/Commentable';

import { Markdown } from './components/Markdown';
import { useThread } from './hooks/public/useThread';
import { Debug } from './components/Debug';

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
  ResolveThreadIconButton,
  Scrollable,
  ThreadFacepile,
  ThreadProvider /* TODO: remove in favor of Thread.Provider? */,
  useComments,
  useInbox,
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
