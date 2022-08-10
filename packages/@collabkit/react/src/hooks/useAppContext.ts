import { createContext } from 'react';
import type { Store } from '../constants';
import type { Events } from '../events';
import { createThemes } from '../components/UIKit';

type Themes = ReturnType<typeof createThemes>;

export type AppContextData = {
  store: Store;
  events: Events;
  workspaceId: string;
  theme: Themes['darkTheme'] | Themes['lightTheme'];
};

export const AppContext = createContext<AppContextData | null>(null);
