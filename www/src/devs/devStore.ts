import { onAuthStateChanged } from 'firebase/auth';
import { onChildAdded, ref, onChildRemoved } from 'firebase/database';
import { proxy } from 'valtio';
import { auth, database } from './database';
import { devEvents } from './devEvents';
import { Store } from './devTypes';

export const devStore = proxy<Store>({
  user: null,
  apps: {},
  subs: {},
  adminApps: {},
  email: '',
  authState: 'blank',
});

devStore.subs['user'] = onAuthStateChanged(auth, (user) => {
  if (user) {
    devStore.user = user;
    devStore.authState = 'signedIn';
    // console.log('subscribing', user.uid);
    devStore.subs['adminAppAdded'] = onChildAdded(
      ref(database, `/adminApps/${user.uid}`),
      devEvents.onAdminAppAdded
    );
    devStore.subs['adminAppRemoved'] = onChildRemoved(
      ref(database, `/adminApps/${user.uid}`),
      devEvents.onAdminAppRemoved
    );
  } else {
    devStore.user = null;
    devStore.authState = 'signedOut';
    // console.log('unsubscribing');
    devStore.subs['adminAppAdded']?.();
    devStore.subs['adminAppRemoved']?.();
  }
});
