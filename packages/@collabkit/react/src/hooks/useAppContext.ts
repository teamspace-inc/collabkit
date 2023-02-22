import { createContext } from 'react';
import type { Events } from '@collabkit/client';
import type { Store } from '@collabkit/core';

export type AppContextValue = {
  store: Store;
  events: Events;
};

export const AppContext = createContext<AppContextValue | null>(null);
