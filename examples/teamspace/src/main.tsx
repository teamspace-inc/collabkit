import React from 'react';
import { createRoot } from 'react-dom';
import App from './App';
import { AppContext } from './hooks/useAppContext';
import setupFirebase from './network/setupFirebase';
import setupFileStore from './utils/setupFileStore';
import { store } from './state/store';
import { bindConnectionState } from './network/bindConnectionState';

setupFirebase();
bindConnectionState(store);
setupFileStore();

const container = document.getElementById('root');

if (!container) {
  throw new Error('Element #root not found.');
}

const root = createRoot(container);

root.render(
  <AppContext.Provider value={{ store }}>
    <App />
  </AppContext.Provider>
);
