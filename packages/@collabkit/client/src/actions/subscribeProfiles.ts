import type { DataSnapshot } from 'firebase/database';
import { onChildAdded, onChildChanged, onValue } from 'firebase/database';
import { ref } from '../sync/firebase/refs';
import type { Store } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { getConfig } from './index';
import { snapshotToProfile } from '../sync/firebase/converters';
import { ensureColor } from './saveProfile';

export async function subscribeProfiles(store: Store) {
  const { appId, workspaceId } = getConfig(store);

  const onError = (e: Error) => {
    console.error({ e });
  };

  const onChange = (snapshot: DataSnapshot) => {
    if (snapshot.key) {
      const id = FirebaseId.decode(snapshot.key);
      const profileRef = ref`/profiles/${appId}/${id}`;
      store.subs[profileRef.toString()] ||= onValue(
        profileRef,
        (profileSnapshot) => {
          // since we don't know the end of the number of profiles in firebase
          // just yet, we use this little hack to leave a couple of cycles for the data to roll in before we render a threads comment list
          const profile = snapshotToProfile(profileSnapshot);
          // todo validate profile data here
          if (profile && profile.name !== 'John Doe') {
            store.profiles[id] = ensureColor(profile);
            if (store.config.mentionableUsers === 'allWorkspace') {
              store.mentionableUsers[id] = profile;
              const numMentionableUsers = Object.keys(store.mentionableUsers).length;
              if (numMentionableUsers > 200) {
                console.warn(
                  '[CollabKit] Over 200 mentionable users you may experience performance issues, \n Consider setting mentionableUsers to just those relevant in your apps context or contact support.',
                  numMentionableUsers
                );
              }
            }
          }
        },
        onError
      );
    }
  };

  const profilesRef = ref`/workspaces/${appId}/${workspaceId}/profiles`;
  const addedKey = `${profilesRef.toString()}#added`;
  const changedKey = `${profilesRef.toString()}#changed`;
  if (!store.subs[addedKey]) {
    store.subs[addedKey] = onChildAdded(profilesRef, onChange, onError);
  }
  if (!store.subs[changedKey]) {
    store.subs[changedKey] = onChildChanged(profilesRef, onChange, onError);
  }
}
