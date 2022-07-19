import React, { useEffect, useLayoutEffect, useState } from 'react';
import { actions } from '../actions';
import { IdentifyProps, MentionProps, Store } from '../constants';
import { Events, createEvents } from '../events';
import { AppContext } from '../hooks/useAppContext';
import { createStore } from '../store';
import { darkTheme, theme } from './UIKit';

const systemDarkMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const themes = {
  dark: darkTheme,
  light: theme,
  auto: systemDarkMode ? darkTheme : theme,
};

// Enable using multiple isolated App
// instances in the same page.
export function CollabKitProvider({
  children,
  colorScheme,
  ...config
}: {
  appId: string;
  apiKey: string;
  workspace: { id: string; name?: string };
  user: IdentifyProps;
  mentionableUsers: MentionProps;
  children: React.ReactNode;
  colorScheme?: 'light' | 'dark' | 'auto';
}) {
  const [context, setContext] = useState<{ store: Store; events: Events } | null>(null);

  useLayoutEffect(() => {
    const store = createStore(config);
    const events = createEvents(store);
    actions.monitorConnection(store, events);
    setContext({ store, events });
    return () => {
      events.onDestroy();
    };
  }, [config.apiKey]);

  useEffect(() => {
    if (context) {
      document.addEventListener('keydown', context.events.onKeyDown);
      return () => {
        document.removeEventListener('keydown', context.events.onKeyDown);
      };
    }
  }, [context]);

  if (!context) {
    return null;
  }

  const theme = themes[colorScheme ?? 'auto'];

  return (
    <AppContext.Provider
      value={{
        store: context.store,
        events: context.events,
        workspaceId: config.workspace.id,
        theme,
      }}
    >
      <span className={theme.className.toString()}>{children}</span>
    </AppContext.Provider>
  );
}
