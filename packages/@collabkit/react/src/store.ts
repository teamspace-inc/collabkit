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
    mentions: null,
    isSetup: false,
    hasIdentified: false,
    isMentionsEnabled: false,
  },
  focusedId: null,
  selectedId: null,
  workspaces: {},
  profiles: {},
  subs: {},
});
