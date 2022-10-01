import { createContext, ReactNode } from 'react';
import type { createThemes } from '@collabkit/theme';
import type { Events } from '@collabkit/client';
import type { Store, ThreadInfo } from '@collabkit/core';
import type { CustomTheme } from '../styles/themes.css';
import { AvatarProps } from '../types';

type Themes = ReturnType<typeof createThemes>;

export type AppContextValue = {
  store: Store;
  events: Events;
  theme: Themes['darkTheme'] | Themes['lightTheme'];
  themeClassName: string;
  themeTokens: CustomTheme;
  renderAvatar?: (props: AvatarProps) => ReactNode;
  renderThreadContextPreview?: (props: {
    threadId: string;
    workspaceId: string;
    userId: string;
    info?: ThreadInfo;
  }) => ReactNode;
};

export const AppContext = createContext<AppContextValue | null>(null);
