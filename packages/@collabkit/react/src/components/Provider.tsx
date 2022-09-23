import React, { ReactNode, useEffect, useState } from 'react';
import { createThemes, CustomTheme } from '@collabkit/theme';
import { actions, Events, createEvents } from '@collabkit/client';
import { ConfigProps, SecureProps, Store, ThreadInfo, UnsecureProps } from '@collabkit/core';
import { AppContext } from '../hooks/useAppContext';
import { createValtioStore } from '../store';
import { FirebaseSync } from '@collabkit/client';
import { SaveMentionableUsers } from './SaveMentionableUsers';
import { AvatarProps } from '../types';
import { FloatingTree } from '@floating-ui/react-dom-interactions';
import { UserContextProvider } from '../hooks/useUserContext';

export type ProviderProps = {
  children: React.ReactNode;
  theme?: CustomTheme;
  renderAvatar?: (props: AvatarProps) => ReactNode;
  renderThreadContextPreview?: (props: {
    threadId: string;
    workspaceId: string;
    userId: string;
    info?: ThreadInfo;
  }) => ReactNode;
} & (SecureProps | UnsecureProps) &
  ConfigProps;

// Enable using multiple isolated App
// instances in the same page.
export function CollabKitProvider({
  children,
  colorScheme = 'auto',
  theme,
  renderAvatar,
  renderThreadContextPreview,
  ...config
}: ProviderProps) {
  const [context, setContext] = useState<{ store: Store; events: Events } | null>(null);

  const { darkTheme, lightTheme } = createThemes(theme);

  const themes = {
    dark: darkTheme,
    light: lightTheme,
  };

  useEffect(() => {
    const sync = new FirebaseSync();
    const store = config._demoStore ?? createValtioStore(config, sync);
    const events = createEvents(store);
    actions.monitorConnection(store, events);
    setContext({ store, events });
    return () => {
      events.onDestroy();
    };
  }, [config.appId, 'token' in config ? config.token : config.apiKey]);

  useEffect(() => {
    if (context) {
      document.addEventListener('keydown', context.events.onKeyDown);
      return () => {
        document.removeEventListener('keydown', context.events.onKeyDown);
      };
    }
  }, [context]);

  const preferredColorScheme = useColorScheme(colorScheme);

  if (!context) {
    return null;
  }

  const currentTheme = themes[preferredColorScheme];

  return (
    <AppContext.Provider
      value={{
        store: context.store,
        events: context.events,
        theme: currentTheme,
        renderAvatar,
        renderThreadContextPreview,
      }}
    >
      <UserContextProvider>
        <FloatingTree>{children}</FloatingTree>
        <SaveMentionableUsers mentionableUsers={config.mentionableUsers} />
      </UserContextProvider>
    </AppContext.Provider>
  );
}

function useColorScheme(colorScheme: 'light' | 'dark' | 'auto') {
  const [preferredColorScheme, setPreferredColorScheme] = useState<'light' | 'dark'>(
    colorScheme === 'auto' ? 'dark' : colorScheme
  );

  useEffect(() => {
    if (colorScheme === 'auto') {
      const onChange = (e: MediaQueryListEvent) => {
        setPreferredColorScheme(e.matches ? 'dark' : 'light');
      };

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setPreferredColorScheme(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', onChange);

      return () => {
        mediaQuery.removeEventListener('change', onChange);
      };
    }
  }, [colorScheme]);

  return colorScheme === 'auto' ? preferredColorScheme : colorScheme;
}
