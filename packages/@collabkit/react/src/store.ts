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
    openId: null,
    point: null,
    workspaces: {},
    profiles: {},
    subs: {},
  });
}
