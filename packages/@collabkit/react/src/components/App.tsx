import React, { useContext, useEffect, useRef } from 'react';
import { actions } from '../actions';
import { IdentifyProps, MentionProps, Store } from '../constants';
import { Events, createEvents } from '../events';
import { createStore } from '../store';

// Enable using multiple isolated App
// instances in the same page.

const AppContext = React.createContext<{
  token: string | null;
  store: Store | null;
  events: Events | null;
}>({ token: null, store: null, events: null });

export function useApp() {
  return useContext(AppContext);
}

export function App(props: {
  appId: string;
  token: string;
  identity: IdentifyProps;
  mentions: MentionProps;
  children: React.ReactNode;
}) {
  const store = useRef(createStore());
  const events = useRef(createEvents(store.current));

  useEffect(() => {
    actions.setup(store.current, events.current, {
      appId: props.appId,
      apiKey: props.token,
      mode: 'UNSECURED',
    });
    actions.identify(store.current, props.identity);
    actions.mentions(store.current, props.mentions);
  }, [props.token]);

  return (
    <AppContext.Provider
      value={{ token: props.token, store: store.current, events: events.current }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
