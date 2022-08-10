import { proxy, subscribe } from 'valtio';
import { devActions } from './devActions';
import { Store } from './devTypes';

const formsJSON = localStorage.getItem('forms');
const forms = formsJSON ? JSON.parse(formsJSON) : {};

export const devStore = proxy<Store>({
  user: null,
  org: null,
  apps: {},
  subs: {},
  forms,
  authState: 'blank',
});

subscribe(devStore, () => {
  localStorage.setItem('forms', JSON.stringify(devStore.forms));
});

devActions.subscribeAuthState();
