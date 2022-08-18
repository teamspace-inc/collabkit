import { createContext } from 'react';
import { createThemes } from '@collabkit/theme';
import type { Store } from '../constants';
import type { Events } from '../events';

type Themes = ReturnType<typeof createThemes>;

export type AppContextData = {
  store: Store;
  events: Events;
  theme: Themes['darkTheme'] | Themes['lightTheme'];
};

export const AppContext = createContext<AppContextData | null>(null);
