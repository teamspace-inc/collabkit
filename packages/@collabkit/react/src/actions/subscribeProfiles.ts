import { DataSnapshot, onChildAdded, onChildChanged, ref } from 'firebase/database';
import { DB, Store } from '../constants';
import { getConfig } from './index';

export async function subscribeProfiles(store: Store) {
  const { appId } = getConfig(store);
  const onError = (e: Error) => {
    console.error({ e });
  };
  const onChange = (child: DataSnapshot) => {
    if (child.key) {
      const profile = child.val();
      store.profiles[child.key] = profile;
    }
  };

  const profilesRef = ref(DB, `/profiles/${appId}`);

  store.subs[`${profilesRef.toString()}#added`] = onChildAdded(profilesRef, onChange, onError);

  store.subs[`${profilesRef.toString()}#changed`] = onChildChanged(profilesRef, onChange, onError);
}
