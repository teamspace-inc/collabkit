import { onChildAdded, ref, onChildRemoved } from 'firebase/database';

import { database, auth } from './database';
import { devStore } from './devStore';
import { devEvents } from './devEvents';
import { onAuthStateChanged } from '@firebase/auth';
import { AppList } from './AppList';

import { useSnapshot } from 'valtio';
import { EnterEmail } from './EnterEmail';
import { CheckEmail } from './CheckEmail';
import { StickyHeader } from '../StickyHeader';
import { Logo } from '../Logo';

devStore.subs['user'] = onAuthStateChanged(auth, (user) => {
  devStore.user = user;
  if (user) {
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
    // console.log('unsubscribing');
    devStore.subs['adminAppAdded']?.();
    devStore.subs['adminAppRemoved']?.();
  }
});

export function Devs() {
  const { authState } = useSnapshot(devStore);

  const view = {
    signedOut: <EnterEmail />,
    signedIn: <AppList />,
    magicLinkSent: <CheckEmail />,
  };

  return (
    <div>
      <StickyHeader
        style={{ marginTop: '1.5rem' }}
        left={<Logo onClick={() => (window.location.href = '/')} />}
      />
      {view[authState]}
    </div>
  );
}
