import { createContext } from 'react';
import { darkTheme, theme } from '../components/UIKit';
import type { Store } from '../constants';
import type { Events } from '../events';

export type AppContextData = {
  store: Store;
  events: Events;
  workspaceId: string;
  theme: typeof theme | typeof darkTheme;
};

export const AppContext = createContext<AppContextData | null>(null);
