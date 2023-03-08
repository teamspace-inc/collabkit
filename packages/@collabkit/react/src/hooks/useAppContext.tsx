import React, { ReactNode } from 'react';
import { createContext, useMemo } from 'react';
import { createEvents, Events } from '@collabkit/client';
import type { Store } from '@collabkit/core';

export type AppContextValue = {
  store: Store;
  events: Events;
};

export const AppContext = createContext<AppContextValue | null>(null);

export function StoreProvider({ children, store }: { children: ReactNode; store: Store }) {
  const app = useMemo(() => {
    const events = createEvents(store);
    return { store, events };
  }, [store]);
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
}
