import React from 'react';
import { actions } from './actions';
import { Thread } from './components/Thread';
import { store } from './store';

function App(props: { token: string; children: React.ReactElement }) {
  store.token = props.token;
  return props.children;
}

export const CollabKit = {
  App,
  Thread,
  setup: actions.setup,
  identify: actions.identify,
};
