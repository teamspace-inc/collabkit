import { createContext, ReactNode } from 'react';
import { createThemes } from '@collabkit/theme';
import type { Events } from '@collabkit/client';
import type { Profile, Store, ThreadInfo } from '@collabkit/core';

type Themes = ReturnType<typeof createThemes>;

export type AppContextValue = {
  store: Store;
  events: Events;
  theme: Themes['darkTheme'] | Themes['lightTheme'];
  renderAvatar?: (props: { profile: Profile }) => ReactNode;
  renderThreadContextPreview?: (props: {
    threadId: string;
    workspaceId: string;
    userId: string;
    info?: ThreadInfo;
  }) => ReactNode;
};

export const AppContext = createContext<AppContextValue | null>(null);
