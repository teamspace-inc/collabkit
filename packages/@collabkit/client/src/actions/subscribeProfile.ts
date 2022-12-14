import { onValue } from 'firebase/database';
import { ref } from '../sync/firebase/refs';
import type { Store } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { getConfig } from './index';
import { snapshotToProfile } from '../sync/firebase/converters';
import { ensureColor } from './saveProfile';

export async function subscribeProfile(store: Store, profileId: string) {
  const { appId } = getConfig(store);

  const onError = (e: Error) => {
    console.error({ e });
  };

  const id = FirebaseId.decode(profileId);
  const profileRef = ref`/profiles/${appId}/${id}`;

  store.subs[profileRef.toString()] = onValue(
    profileRef,
    (profileSnapshot) => {
      const profile = snapshotToProfile(profileSnapshot);
      // todo validate profile data here
      if (profile) {
        store.profiles[id] = ensureColor(profile);
        if (store.config.mentionableUsers === 'allWorkspace') {
          // console.log('mentionableUsers: id', id, 'profile', profile);
          store.mentionableUsers[id] = profile;
        }
      }
    },
    onError
  );
}
