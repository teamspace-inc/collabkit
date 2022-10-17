import { proxy, subscribe } from 'valtio';
import { dashboardActions } from './dashboardActions';
import { Store } from './dashboardTypes';

const formsJSON = localStorage.getItem('forms');
const forms = formsJSON ? JSON.parse(formsJSON) : {};

export const dashboardStore = proxy<Store>({
  user: null,
  org: null,
  apps: {},
  subs: {},
  forms,
  authState: 'blank',
});

subscribe(dashboardStore, () => {
  localStorage.setItem('forms', JSON.stringify(dashboardStore.forms));
});

dashboardActions.subscribeAuthState();
