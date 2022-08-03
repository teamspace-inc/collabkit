import { proxy } from 'valtio';
import { Store } from './devTypes';

export const devStore = proxy<Store>({
  user: null,
  apps: {},
  subs: {},
  adminApps: {},
  email: '',
  authState: 'signedOut',
});
