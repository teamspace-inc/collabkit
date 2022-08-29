import type {
  Config,
  Mention,
  MentionProps,
  Store,
  Subscriptions,
  Workspace,
} from '@collabkit/core';
import type { CustomTheme } from '@collabkit/theme';
import { CollabKitProvider } from './components/Provider';
import { TableCell } from './components/table/TableCell';
import { Thread } from './components/Thread';
import { useUnreadCount } from './hooks/public/useUnreadCount';
import { createValtioStore } from './store';

export {
  CollabKitProvider as Provider,
  CollabKitProvider,
  Thread,
  TableCell,
  useUnreadCount,
  createValtioStore as internal_createStore,
};
export type { Config, Mention, MentionProps, Store, Subscriptions, CustomTheme, Workspace };
