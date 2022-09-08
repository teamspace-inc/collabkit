import { createContext, ReactNode } from 'react';
import { createThemes } from '@collabkit/theme';
import type { Events } from '@collabkit/client';
import type { Profile, Store } from '@collabkit/core';

type Themes = ReturnType<typeof createThemes>;

export type AppContextValue = {
  store: Store;
  events: Events;
  theme: Themes['darkTheme'] | Themes['lightTheme'];
  renderAvatar?: (props: { profile: Profile }) => ReactNode;
};

export const AppContext = createContext<AppContextValue | null>(null);
