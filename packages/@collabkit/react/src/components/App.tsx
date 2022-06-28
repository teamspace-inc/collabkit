import React, { useContext, useEffect, useRef } from 'react';
import { Store } from '../constants';
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

function App(props: { token: string; children: React.ReactNode }) {
  const store = useRef(createStore());
  const events = useRef(createEvents(store.current));

  useEffect(() => {
    store.current = createStore();
    events.current = createEvents(store.current);
  }, [props.token]);

  return (
    <AppContext.Provider
      value={{ token: props.token, store: store.current, events: events.current }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export { App };
