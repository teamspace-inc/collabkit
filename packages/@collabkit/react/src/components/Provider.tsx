import React, { ReactNode, useEffect, useState } from 'react';
import { createThemes } from '@collabkit/theme';
import { actions, Events, createEvents } from '@collabkit/client';
import {
  ConfigProps,
  SecureProps,
  Store,
  ThreadInfo,
  UnsecureProps,
  DeepPartial,
} from '@collabkit/core';
import { AppContext } from '../hooks/useAppContext';
import { createValtioStore } from '../store';
import { FirebaseSync } from '@collabkit/client';
import { SaveMentionableUsers } from './SaveMentionableUsers';
import { AvatarProps } from '../types';
import { FloatingTree } from '@floating-ui/react-dom-interactions';
import merge from 'deepmerge';
import { UserContextProvider } from '../hooks/useUserContext';
import * as themes from '../styles/themes.css';

export type ProviderProps = {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | themes.CustomTheme;
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
  theme,
  renderAvatar,
  renderThreadContextPreview,
  ...config
}: ProviderProps) {
  const [context, setContext] = useState<{ store: Store; events: Events } | null>(null);

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

  let stitchesTheme: any;
  let currentTheme = '';
  let themeTokens = {};
  if (theme === 'light') {
    stitchesTheme = createThemes().lightTheme;
  } else if (theme === 'dark') {
    stitchesTheme = createThemes().darkTheme;
    currentTheme = themes.dark;
  } else {
    stitchesTheme = createThemes().lightTheme;
    if (theme) {
      themeTokens = merge(themes.defaultTheme, theme);
    }
  }

  if (!context) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        store: context.store,
        events: context.events,
        theme: stitchesTheme,
        themeClassName: `${currentTheme} ${stitchesTheme}`,
        themeTokens,
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
