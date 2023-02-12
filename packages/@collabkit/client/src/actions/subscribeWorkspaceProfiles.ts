import { DataSnapshot, get, query } from 'firebase/database';
import { onChildAdded, onChildChanged } from 'firebase/database';
import { ref } from '../sync/firebase/refs';
import type { Profile, Store } from '@collabkit/core';
import { FirebaseId } from '@collabkit/core';
import { getConfig } from './getConfig';
import { snapshotToProfile } from '../sync/firebase/converters';

function processSnapshot(snapshot: DataSnapshot) {
  if (!snapshot.key) {
    return null;
  }
  const id = FirebaseId.decode(snapshot.key);
  const profile = snapshotToProfile(snapshot);
  if (!profile) {
    return null;
  }
  profile.id = id;
  return profile;
}

export async function subscribeWorkspaceProfiles(store: Store) {
  const { appId, workspaceId } = getConfig(store);
  console.log('subscribeWorkspaceProfiles');

  const onError = (e: Error) => {
    console.error({ e });
  };

  const onChange = (snapshot: DataSnapshot) => {
    const profile = processSnapshot(snapshot);
    if (!profile) return;
    store.profiles[profile.id] = profile;
    if (store.config.mentionableUsers === 'allWorkspace') {
      store.mentionableUsers[profile.id] = profile;
    }
  };

  const onAdded = (snapshot: DataSnapshot) => {
    const profile = processSnapshot(snapshot);
    if (!profile) return;
    store.profiles[profile.id] ||= profile;
    if (store.config.mentionableUsers === 'allWorkspace') {
      store.mentionableUsers[profile.id] ||= profile;
    }
  };

  const profilesRef = ref`/views/workspaceProfiles/${appId}/${workspaceId}`;
  const profilesQuery = query(profilesRef);
  const profiles: { [id: string]: Profile } = {};
  const workspaceProfiles = await get(profilesQuery);

  let count = 0;
  let didWarnLargeWorkspace = false;

  function warnLargeWorkspace() {
    if (!didWarnLargeWorkspace) {
      console.warn(
        '[CollabKit] Setting mentionableUsers to "allWorkspace" in workspaces with a large number of users is not recommended. To ensure optimal performance, please consider passing an array of mentionable users instead or contact us for support.'
      );
      didWarnLargeWorkspace = true;
    }
  }

  workspaceProfiles.forEach((childSnapshot: DataSnapshot) => {
    count++;
    if (count > 100) {
      warnLargeWorkspace();
    }
    const profile = processSnapshot(childSnapshot);
    if (!profile) return;
    profiles[profile.id] = profile;
  });

  store.profiles = profiles;
  if (store.config.mentionableUsers === 'allWorkspace') {
    store.mentionableUsers = profiles;
  }

  const addedKey = `${profilesRef.toString()}#added`;
  const changedKey = `${profilesRef.toString()}#changed`;
  if (!store.subs[addedKey]) {
    store.subs[addedKey] = onChildAdded(profilesRef, onAdded, onError);
  }
  if (!store.subs[changedKey]) {
    store.subs[changedKey] = onChildChanged(profilesRef, onChange, onError);
  }
}
