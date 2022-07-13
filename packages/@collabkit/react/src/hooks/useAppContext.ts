import { createContext } from 'react';
import type { Store } from '../constants';
import type { Events } from '../events';

export type AppContextData = {
  store: Store;
  events: Events;
  workspaceId: string;
};

export const AppContext = createContext<AppContextData | null>(null);
