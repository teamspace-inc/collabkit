import { CollabKitProvider } from './components/Provider';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { Button } from './components/Button';
import { Inbox } from './components/Inbox';
import { CurrentUser } from './components/CurrentUser';
import { FloatingButton } from './components/FloatingButton';
import { Commentable } from './components/Commentable';
import { Pin, PurePin } from './components/Pin';
import { IdentifyProps, Mention, Store, Subscriptions, Workspace } from './constants';
import { MentionProps } from './constants';
import { PopoverThread } from './components/PopoverThread';
import { Config, createStore, createWorkspace } from './store';
import { useUnreadCount } from './hooks/public/useUnreadCount';

export {
  CollabKitProvider as Provider,
  Commentable,
  CurrentUser,
  Thread,
  Button,
  FloatingButton,
  PopoverThread,
  Pin,
  Inbox,
  Debug,
  // withComments,
  useUnreadCount,
  // pure components just render props passed
  PurePin as PurePin,
  createStore as internal_createStore,
  createWorkspace as internal_createWorkspace,
  type Config,
  type Store,
  type Workspace,
  type Subscriptions,
};
export type { IdentifyProps, MentionProps, Mention };
