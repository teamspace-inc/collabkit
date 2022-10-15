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
import { CommentPlugin } from './components/lexical/CommentPlugin';

export {
  CollabKitProvider as Provider,
  CollabKitProvider,
  CommentPlugin as LexicalCommentPlugin,
  ThemeProvider,
  Thread,
  InboxButton,
  PopoverTrigger,
  ThemeWrapper,
  Inbox,
  Sidebar,
  usePopoverThread,
  useUnreadThreadsCount,
  useUnreadCommentsCount as useUnreadCount,
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
