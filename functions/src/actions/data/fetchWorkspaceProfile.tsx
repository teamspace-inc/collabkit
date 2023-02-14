import { isValidWorkspaceProfile } from '../helpers/isValidWorkspaceProfile';
import { ref } from './refs';

export async function fetchWorkspaceProfile(props: {
  appId: string;
  workspaceId: string;
  profileId: string;
}) {
  const { appId, workspaceId, profileId } = props;
  console.log('fetchWorkspaceProfile', { appId, workspaceId, profileId });
  const snapshot = await ref`/workspaces/${appId}/${workspaceId}/profiles/${profileId}`.get();
  const profile = await snapshot.val();
  if (!isValidWorkspaceProfile(profile)) {
    throw new Error('invalid workspace profile');
  }
  return profile;
}
