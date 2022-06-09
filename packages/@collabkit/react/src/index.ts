import React from 'react';
import { actions } from './actions';
import { Debug } from './components/Debug';
import { Thread } from './components/Thread';
import { store } from './store';

function App(props: { token: string; children: React.ReactElement }) {
  store.token = props.token;
  return props.children;
}

export const CollabKit = {
  App,
  Thread,
  Debug,
  setup: actions.setup,
  identify: actions.identify,
};
