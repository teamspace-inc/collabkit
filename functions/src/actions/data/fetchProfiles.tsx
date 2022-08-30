import * as admin from 'firebase-admin';
import { Profile } from '../../types';
import { isProfile } from '../helpers/isProfile';

export async function fetchProfiles(props: { appId: string; profileIds: string[] }) {
  const db = admin.database();

  const profileSnapshots = await Promise.all(
    props.profileIds.map((profileId) => db.ref(`/profiles/${props.appId}/${profileId}/`).get())
  );

  const profiles: { [id: string]: Profile } = {};
  for (const profileId of props.profileIds) {
    const profileSnapshot = profileSnapshots.find((snapshot) => snapshot.key === profileId);
    const profile = profileSnapshot?.val();
    if (isProfile(profile)) {
      profiles[profileId] = profile;
    }
  }

  return { profiles };
}
