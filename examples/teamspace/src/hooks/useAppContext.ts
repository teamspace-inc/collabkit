import React from 'react';

import type { GlobalStore } from 'state/constants';

export type AppContextType = { store: GlobalStore };

export const AppContext = React.createContext(null as AppContextType | null);

export function useAppContext(): AppContextType {
  const context = React.useContext(AppContext);
  if (context == null) {
    throw new Error('Missing AppContext.Provider.');
  }
  return context;
}
