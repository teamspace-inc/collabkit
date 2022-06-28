import { proxy } from 'valtio';
import { Store } from './constants';

export function createStore() {
  return proxy<Store>({
    isConnected: false,
    token: '',
    appState: 'blank',
    uiState: 'idle',
    config: {
      identify: null,
      setup: null,
      mentions: null,
      isSetup: false,
      hasIdentified: false,
    },
    focusedId: null,
    selectedId: null,
    reactingId: null,
    workspaces: {},
    profiles: {},
    subs: {},
  });
}

// export const store = proxy<Store>({
//   isConnected: false,
//   token: '',
//   appState: 'blank',
//   uiState: 'idle',
//   config: {
//     identify: null,
//     setup: null,
//     mentions: null,
//     isSetup: false,
//     hasIdentified: false,
//   },
//   focusedId: null,
//   selectedId: null,
//   reactingId: null,
//   workspaces: {},
//   profiles: {},
//   subs: {},
// });
