import {
  DataSnapshot,
  onChildAdded,
  onChildChanged,
  ref,
  onValue,
  getDatabase,
} from 'firebase/database';
import type { Store } from '@collabkit/core';
import { getConfig } from './index';
import { getApp } from 'firebase/app';

function setHasProfile(store: Store, userId: string) {
  for (const workspaceId in store.workspaces) {
    for (const threadId in store.workspaces[workspaceId].timeline) {
      for (const eventId in store.workspaces[workspaceId].timeline[threadId]) {
        if (store.workspaces[workspaceId].timeline[threadId][eventId].createdById === userId) {
          store.workspaces[workspaceId].timeline[threadId][eventId].hasProfile = true;
        }
      }
    }
  }
}

export async function subscribeProfiles(store: Store) {
  let gotFirstProfile = false;
  const { appId, workspaceId } = getConfig(store);

  const onError = (e: Error) => {
    console.error({ e });
  };

  const onChange = (child: DataSnapshot) => {
    if (child.key) {
      const id = child.key;
      const profileRef = ref(getDatabase(getApp('CollabKit')), `/profiles/${appId}/${id}`);
      store.subs[profileRef.toString()] ||= onValue(
        profileRef,
        (profileSnapshot) => {
          // since we don't know the end of the number of profiles in firebase
          // just yet, we use this little hack to leave a couple of cycles for the data to roll in before we render a threads comment list
          if (!gotFirstProfile) {
            setTimeout(() => {
              store.workspaces[workspaceId].likelyFetchedAllProfiles = true;
            }, 32);
            gotFirstProfile = true;
          }
          const profile = profileSnapshot.val();
          if (profile) {
            store.profiles[id] = profile;
            setHasProfile(store, id);
          }
        },
        onError
      );
    }
  };

  const profilesRef = ref(
    getDatabase(getApp('CollabKit')),
    `/workspaces/${appId}/${workspaceId}/profiles`
  );
  const addedKey = `${profilesRef.toString()}#added`;
  const changedKey = `${profilesRef.toString()}#changed`;
  if (!store.subs[addedKey]) {
    store.subs[addedKey] = onChildAdded(profilesRef, onChange, onError);
  }
  if (!store.subs[changedKey]) {
    store.subs[changedKey] = onChildChanged(profilesRef, onChange, onError);
  }
}
