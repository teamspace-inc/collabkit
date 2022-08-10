import { proxy } from 'valtio';
import { devActions } from './devActions';
import { Store } from './devTypes';

export const devStore = proxy<Store>({
  user: null,
  apps: {},
  subs: {},
  adminApps: {},
  email: '',
  authState: 'blank',
});

devActions.subscribeAuthState();
