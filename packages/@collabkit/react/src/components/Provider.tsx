import React, { useEffect, useState } from 'react';
import { actions, Events, createEvents } from '@collabkit/client';
import { AppContext } from '../hooks/useAppContext';
import { createValtioStore } from '../store';
import { FirebaseSync } from '@collabkit/client';
import { SaveMentionableUsers } from './SaveMentionableUsers';
import { FloatingTree } from '@floating-ui/react';
import { AuthenticatedContext } from './AuthenticatedContext';
import { CustomTheme } from '../theme/themes.css';
import { ThemeProvider } from './ThemeContext';
import { RenderFnContext } from '../hooks/useRenderFnContext';
import type { ConfigProps, SecureProps, Store, UnsecureProps } from '@collabkit/core';
import type { RenderFnContextValue } from '../hooks/useRenderFnContext';

export type ProviderProps = {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | CustomTheme;
  // notificationPreferences: 'allWorkspace' | 'onlyThread' | 'off';
} & (SecureProps | UnsecureProps) &
  ConfigProps &
  RenderFnContextValue;

// Enable using multiple isolated App
// instances in the same page.
export function CollabKitProvider<T extends object>({
  children,
  theme,
  renderAvatar,
  renderThreadContextPreview,
  ...config
}: ProviderProps) {
  const [context, setContext] = useState<{
    store: Store;
    events: Events;
  } | null>(null);
  const [renderFnContext, setRenderFnContext] = useState<RenderFnContextValue>({});

  useEffect(() => {
    const sync = new FirebaseSync({ test: !!config._test });
    const store = config._demoStore ?? createValtioStore(config, sync);
    const events = createEvents(store);
    actions.monitorConnection(store, events);
    setContext({ store, events });
    return () => events.onDestroy();
  }, [config.appId, 'token' in config ? config.token : config.apiKey]);

  useEffect(() => {
    setRenderFnContext({
      renderAvatar: renderAvatar,
      renderThreadContextPreview,
    });
  }, [renderAvatar, renderThreadContextPreview]);

  useEffect(() => {
    if (context) {
      document.addEventListener('keydown', context.events.onKeyDown);
      document.addEventListener('pointerdown', context.events.onGlobalPointerDown);
      return () => {
        document.removeEventListener('pointerdown', context.events.onGlobalPointerDown);
        document.removeEventListener('keydown', context.events.onKeyDown);
      };
    }
  }, [context?.events]);

  if (!context) {
    return null;
  }

  return (
    <AppContext.Provider value={context}>
      <RenderFnContext.Provider value={renderFnContext}>
        <ThemeProvider theme={theme}>
          <AuthenticatedContext>
            <FloatingTree>{children}</FloatingTree>
            <SaveMentionableUsers mentionableUsers={config.mentionableUsers} />
          </AuthenticatedContext>
        </ThemeProvider>
      </RenderFnContext.Provider>
    </AppContext.Provider>
  );
}
