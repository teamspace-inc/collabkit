import type {
  Config,
  Mention,
  MentionableUsers,
  Store,
  Subscriptions,
  Workspace,
} from '@collabkit/core';

import type { AvatarProps, CommentProps, ThreadProps } from './types';
import type { CustomTheme } from './theme/themes.css';

import { CollabKitContextProvider, CollabKitProvider, Provider } from './components/Provider';
import { Thread } from './components/Thread';
import { useUnreadCommentsCount } from './hooks/public/useUnreadCommentsCount';
import { useUnreadThreadsCount } from './hooks/public/useUnreadThreadsCount';
import { Inbox } from './components/Inbox';
import { InboxButton } from './components/InboxButton';
import { ThemeProvider } from './components/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { ThemeWrapper } from './components/ThemeWrapper';
import { useIsResolved } from './hooks/public/useIsResolved';
import { useResolveThread } from './hooks/public/useResolveThread';
import { useThreadUsers } from './hooks/public/useThreadUsers';
import { useComposer } from './hooks/public/useComposer';
import { ThreadFacepile } from './components/ThreadFacepile';
import { useReplyCount } from './hooks/useReplyCount';
import { useCommentableRef } from './hooks/useCommentableRef';
import { Comment } from './components/Comment';
import { Profile } from './components/Profile';
import { Composer } from './components/composer/Composer';
import { Scrollable } from './components/Scrollable';
import { CommentList } from './components/CommentList';
import { Button } from './components/Button';

export * from './hooks/useSidebarCommentsButton';

export * from './components/Comment';
export * from './components/composer/Composer';
export * from './components/Inbox';
export * from './components/InboxButton';
export * from './components/Provider';
export * from './components/Sidebar';
export * from './components/Thread';
export * from './components/ThreadFacepile';
export * from './components/ThemeContext';
export * from './components/ThemeWrapper';
export * from './components/Profile';
export * from './components/Scrollable';
export * from './components/CommentList';
export * from './components/Popover';
export * from './components/Button';
export * from './components/Markdown';
export * from './components/Channel';
export * from './components/Root';
export * from './components/PinCommentButton';
export * from './components/Tooltip';
export * from './components/Catch';
export * from './components/Pin';

export * from './hooks/ProfileContext';

export * from './components/Commentable';
export * from './components/SidebarComments';
export * from './components/ToggleSidebarCommentsButton';

export * from './hooks/public/usePinCommentButton';

// Used for Vue interop
export { actions, createCollabKitStore } from '../../client/src';

import { Markdown } from './components/Markdown';
import { useThread } from './hooks/public/useThread';
import { Debug } from './components/Debug';
import { Channel } from './components/Channel';

import { LightTheme } from './theme/themes/BaseTheme';
import { DarkTheme } from './theme/themes/DarkTheme';
import { useIsAuthenticated } from './hooks/useIsAuthenticated';

const Themes = {
  LightTheme,
  DarkTheme,
};

export {
  Themes,
  Provider,
  CollabKitProvider,
  Inbox,
  InboxButton,
  Markdown,
  Sidebar,
  ThemeProvider,
  ThemeWrapper,
  Thread,
  Channel,
  useCommentableRef,
  useUnreadCommentsCount as useUnreadCount,
  useUnreadThreadsCount,
  // advanced
  Button,
  CollabKitContextProvider,
  Comment,
  CommentList,
  Composer,
  Debug,
  Profile,
  Scrollable,
  ThreadFacepile,
  useIsAuthenticated,
  useIsResolved,
  useReplyCount,
  useResolveThread,
  useThreadUsers,
  useThread,
  useComposer,
};

export type {
  AvatarProps,
  CommentProps,
  Config,
  CustomTheme,
  Mention,
  MentionableUsers,
  Store,
  Subscriptions,
  ThreadProps,
  Workspace,
};
