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

import { useUnreadCommentsCount } from './hooks/public/useUnreadCommentsCount';
import { useUnreadThreadsCount } from './hooks/public/useUnreadThreadsCount';
import { createValtioStore } from './store';
import PopoverThread, { PopoverThreadProps } from './components/PopoverThread';
import { useIsResolved } from './hooks/public/useIsResolved';
import { useResolveThread } from './hooks/public/useResolveThread';
import { useThreadUsers } from './hooks/public/useThreadUsers';
import { useComposer } from './hooks/public/useComposer';
import { useReplyCount } from './hooks/useReplyCount';
import { usePopoverThread } from './hooks/usePopoverThread';
import { useCommentableRef } from './hooks/useCommentableRef';

import Comment from './components/Comment';
import Profile from './components/Profile';
import { Commentable } from './components/Commentable';
import Composer from './components/composer/Composer';
import Popover from './components/Popover';
import Inbox from './components/Inbox';
import Thread from './components/Thread';
import Channel from './components/Channel';
import Sidebar from './components/Sidebar';
import Markdown from './components/Markdown';
import { SidebarInboxButton } from './components/SidebarInboxButton';
import { SidebarInbox } from './components/SidebarInbox';
import Provider from './components/Provider';
import { ThemeProvider } from './components/ThemeContext';
import { ThemeWrapper } from './components/ThemeWrapper';

import CollabKitRecharts from './components/Recharts';

import { useThread } from './hooks/public/useThread';

export {
  CollabKitRecharts,
  Provider,
  Provider as CollabKitProvider,
  Comment,
  Popover,
  Commentable,
  Thread,
  Inbox,
  ThemeWrapper,
  Profile,
  Channel,
  Sidebar,
  Markdown,
  Composer,
  ThemeProvider,
  PopoverThread,
  SidebarInbox,
  SidebarInboxButton,
  useCommentableRef,
  useUnreadCommentsCount as useUnreadCount,
  useUnreadThreadsCount,
  // advanced
  useIsResolved,
  usePopoverThread,
  useReplyCount,
  useResolveThread,
  useThreadUsers,
  useThread,
  useComposer,
  // internal
  createValtioStore as internal_createStore,
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
