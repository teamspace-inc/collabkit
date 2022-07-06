import { ref, onChildAdded } from 'firebase/database';
import { DB, Store } from '../constants';
import { getConfig } from './index';

export function subscribeProfiles(store: Store) {
  const { appId } = getConfig(store);

  if (store.subs['profiles']) {
    return;
  }
  console.log('got sub profiles', appId);
  try {
    store.subs['profiles'] = onChildAdded(
      ref(DB, `/profiles/${appId}/`),
      (snapshot) => {
        console.log('got profile', snapshot.val());
        const profile = snapshot.val();
        const profileId = snapshot.key;
        if (profileId) {
          store.profiles[profileId] = profile;
        }
      },
      (e) => {
        console.error({ e });
      }
    );
  } catch (e) {
    console.error(e);
  }
}
