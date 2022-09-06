import { createContext } from 'react';
import { createThemes } from '@collabkit/theme';
import type { Events } from '@collabkit/client';
import type { Store } from '@collabkit/core';

type Themes = ReturnType<typeof createThemes>;

export type AppContextValue = {
  store: Store;
  events: Events;
  theme: Themes['darkTheme'] | Themes['lightTheme'];
};

export const AppContext = createContext<AppContextValue | null>(null);
