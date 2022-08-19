import { CollabKitProvider } from './components/Provider';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { Config, Mention, Store, Subscriptions, Workspace } from './constants';
import { MentionProps } from './constants';
import { createValtioStore } from './store';
import { useUnreadCount } from './hooks/public/useUnreadCount';

export {
  CollabKitProvider as Provider,
  Thread,
  Debug,
  // withComments,
  useUnreadCount,
  // pure components just render props passed
  createValtioStore as internal_createStore,
  type Store,
  type Workspace,
  type Subscriptions,
  type Config,
};
export type { MentionProps, Mention };
