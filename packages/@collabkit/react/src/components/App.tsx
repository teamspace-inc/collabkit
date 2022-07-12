import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { actions } from '../actions';
import { IdentifyProps, MentionProps, Store } from '../constants';
import { Events, createEvents } from '../events';
import { createStore } from '../store';

// Enable using multiple isolated App
// instances in the same page.

const AppContext = React.createContext<
  | {
      token: string;
      store: Store;
      events: Events;
    }
  | undefined
>(undefined);

export function useApp() {
  const app = useContext(AppContext);
  if (app === undefined) {
    throw new Error('useApp must be used within a App');
  }
  return app;
}

export function App(props: {
  appId: string;
  token: string;
  identity: IdentifyProps;
  mentions: MentionProps;
  children: React.ReactNode;
}) {
  const [context, setContext] = useState<{ store: Store; events: Events } | null>(null);

  useLayoutEffect(() => {
    const store = createStore();
    const events = createEvents(store);
    actions.setup(store, events, {
      appId: props.appId,
      apiKey: props.token,
      mode: 'UNSECURED',
    });
    actions.identify(store, props.identity);
    actions.mentions(store, props.mentions);
    setContext({ store, events });

    return () => {
      events.onDestroy();
    };
  }, [props.token]);

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
      value={{ token: props.token, store: context.store, events: context.events }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
