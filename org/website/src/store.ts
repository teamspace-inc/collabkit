import { proxy } from 'valtio';
import { Store } from './App';

export const store = proxy<Store>({
  user: null,
  apps: {},
  subs: {},
  adminApps: {},
});
