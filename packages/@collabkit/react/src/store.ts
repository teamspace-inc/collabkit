import { proxy } from 'valtio';
import { Store } from './constants';

export const store = proxy<Store>({
  isConnected: false,
  token: '',
  appId: '',
  apiKey: '',
  userId: '',
  appState: 'blank',
  config: {
    identify: null,
    setup: null,
    isSetup: false,
    hasIdentified: false,
  },
  selectedId: null,
  composer: {},
  profiles: {},
  timelines: {},
  subs: {},
});
