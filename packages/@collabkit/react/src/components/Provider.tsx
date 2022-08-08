import React, { useEffect, useLayoutEffect, useState } from 'react';
import { actions } from '../actions';
import { IdentifyProps, MentionProps, Store } from '../constants';
import { Events, createEvents } from '../events';
import { AppContext } from '../hooks/useAppContext';
import { createStore } from '../store';
import { FirebaseSync } from '../sync';
import { createThemes, DeepPartial, Theme } from './UIKit';
import merge from 'lodash.merge';

const systemDarkMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Enable using multiple isolated App
// instances in the same page.
export function CollabKitProvider({
  children,
  colorScheme,
  theme,
  ...config
}: {
  appId: string;
  apiKey: string;
  workspace: { id: string; name?: string };
  user: IdentifyProps;
  mentionableUsers: MentionProps;
  children: React.ReactNode;
  colorScheme?: 'light' | 'dark' | 'auto';
  theme?: DeepPartial<Theme>;
  readOnly?: boolean;
  mode?: 'demo';
  _demoStore?: Store;
}) {
  const [context, setContext] = useState<{ store: Store; events: Events } | null>(null);

  const { darkTheme, lightTheme } = createThemes(theme);

  const themes = {
    dark: darkTheme,
    light: lightTheme,
    auto: systemDarkMode ? darkTheme : lightTheme,
  };

  useLayoutEffect(() => {
    const sync = new FirebaseSync();
    const store = config._demoStore ?? createStore(config, sync);
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

  const baseTheme = themes[colorScheme ?? 'auto'];

  return (
    <AppContext.Provider
      value={{
        store: context.store,
        events: context.events,
        workspaceId: config.workspace.id,
        theme: theme ? merge(baseTheme, theme) : baseTheme,
      }}
    >
      <span className={baseTheme.className.toString()}>{children}</span>
    </AppContext.Provider>
  );
}
