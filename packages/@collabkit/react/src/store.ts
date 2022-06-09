import { proxy } from 'valtio';
import { Store } from './constants';

export const store = proxy<Store>({
  isConnected: false,
  token: '',
  appState: 'blank',
  uiState: 'idle',
  config: {
    identify: null,
    setup: null,
    isSetup: false,
    hasIdentified: false,
  },
  focusedId: null,
  selectedId: null,
  composers: {},
  profiles: {},
  timelines: {},
  subs: {},
});
