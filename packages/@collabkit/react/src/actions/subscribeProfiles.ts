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

  const addedKey = `${profilesRef.toString()}#added`;
  const changedKey = `${profilesRef.toString()}#changed`;
  if (!store.subs[addedKey]) {
    store.subs[addedKey] = onChildAdded(profilesRef, onChange, onError);
  }
  if (!store.subs[changedKey]) {
    store.subs[changedKey] = onChildChanged(profilesRef, onChange, onError);
  }
}
