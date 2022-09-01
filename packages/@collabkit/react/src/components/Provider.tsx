import React, { useEffect, useLayoutEffect, useState } from 'react';
import { createThemes, CustomTheme } from '@collabkit/theme';
import { actions, initFirebase, Events, createEvents } from '@collabkit/client';
import { ConfigProps, SecureProps, Store, UnsecureProps } from '@collabkit/core';
import { AppContext } from '../hooks/useAppContext';
import { createValtioStore } from '../store';
import { FirebaseSync } from '@collabkit/client';
import { SaveMentionableUsers } from './SaveMentionableUsers';

export type OtherProps = {
  children: React.ReactNode;
  theme?: CustomTheme;
};

export type ProviderProps = (SecureProps | UnsecureProps) & ConfigProps & OtherProps;

initFirebase();

// Enable using multiple isolated App
// instances in the same page.
export function CollabKitProvider({
  children,
  colorScheme = 'auto',
  theme,
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
      }}
    >
      {children}
      <SaveMentionableUsers mentionableUsers={config.mentionableUsers} />
    </AppContext.Provider>
  );
}

function useColorScheme(colorScheme: 'light' | 'dark' | 'auto') {
  const [preferredColorScheme, setPreferredColorScheme] = useState<'light' | 'dark'>(
    colorScheme === 'auto' ? 'dark' : colorScheme
  );

  if ('matchMedia' in globalThis) {
    useLayoutEffect(() => {
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
  }

  return preferredColorScheme;
}
