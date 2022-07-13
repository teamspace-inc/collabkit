import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { actions } from '../actions';
import { IdentifyProps, MentionProps, Store } from '../constants';
import { Events, createEvents } from '../events';
import { AppContext, AppContextData } from '../hooks/useAppContext';
import { createStore } from '../store';

export function useApp(): AppContextData {
  const app = useContext(AppContext);
  if (app == null) {
    throw new Error('useApp must be used within a CollabKit.Provider');
  }
  return app;
}

// Enable using multiple isolated App
// instances in the same page.

export function CollabKitProvider({
  children,
  ...config
}: {
  appId: string;
  apiKey: string;
  workspace: { id: string; name?: string };
  user: IdentifyProps;
  mentionableUsers: MentionProps;
  children: React.ReactNode;
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

  return (
    <AppContext.Provider
      value={{
        store: context.store,
        events: context.events,
        workspaceId: config.workspace.id,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
