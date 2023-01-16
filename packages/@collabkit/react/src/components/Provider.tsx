import React, { ReactNode, useEffect, useState } from 'react';
import { actions, Events, createEvents } from '@collabkit/client';
import { ConfigProps, SecureProps, Store, ThreadInfo, UnsecureProps } from '@collabkit/core';
import { AppContext } from '../hooks/useAppContext';
import { createValtioStore } from '../store';
import { FirebaseSync } from '@collabkit/client';
import { SaveMentionableUsers } from './SaveMentionableUsers';
import { AvatarProps } from '../types';
import { FloatingTree } from '@floating-ui/react-dom-interactions';
import { UserContextProvider } from '../hooks/useUserContext';
import { CustomTheme } from '../theme/themes.css';
import { ThemeProvider } from './ThemeContext';

export type ProviderProps = {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | CustomTheme;
  // notificationPreferences: 'allWorkspace' | 'onlyThread' | 'off';
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
    const sync = new FirebaseSync({ test: !!config._test });
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
      return () => document.removeEventListener('keydown', context.events.onKeyDown);
    }
  }, [context?.events]);

  if (!context) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        store: context.store,
        events: context.events,
        renderAvatar,
        renderThreadContextPreview,
      }}
    >
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <FloatingTree>{children}</FloatingTree>
          <SaveMentionableUsers mentionableUsers={config.mentionableUsers} />
        </UserContextProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
