import { DataSnapshot, onChildAdded, onChildChanged, ref, onValue } from 'firebase/database';
import { DB, Store } from '../constants';
import { getConfig } from './index';

export async function subscribeProfiles(store: Store) {
  const { appId, workspaceId } = getConfig(store);

  const onError = (e: Error) => {
    console.error({ e });
  };

  const onChange = (child: DataSnapshot) => {
    if (child.key) {
      const id = child.key;
      const profileRef = ref(DB, `/profiles/${appId}/${id}`);
      store.subs[profileRef.toString()] = onValue(
        profileRef,
        (profileSnapshot) => {
          const profile = profileSnapshot.val();
          // console.log({ profile });
          if (profile) {
            store.profiles[id] = profile;
          }
        },
        onError
      );
      const profile = child.val();
      store.profiles[child.key] = profile;
    }
  };

  const profilesRef = ref(DB, `/workspaces/${appId}/${workspaceId}/profiles`);
  const addedKey = `${profilesRef.toString()}#added`;
  const changedKey = `${profilesRef.toString()}#changed`;
  if (!store.subs[addedKey]) {
    store.subs[addedKey] = onChildAdded(profilesRef, onChange, onError);
  }
  if (!store.subs[changedKey]) {
    store.subs[changedKey] = onChildChanged(profilesRef, onChange, onError);
  }
}
