import { isValidWorkspaceProfiles } from '../helpers/isValidWorkspaceProfiles';
import * as FirebaseId from './FirebaseId';
import { ref } from './refs';

export async function fetchWorkspaceProfiles(props: { appId: string; workspaceId: string }) {
  const { appId, workspaceId } = props;
  const snapshot = await ref`/workspaces/${appId}/${workspaceId}/profiles`.get();
  const profiles = await snapshot.val();
  if (!isValidWorkspaceProfiles(profiles)) {
    throw new Error('invalid workspace profiles');
  }
  return Object.keys(profiles).map((id) => FirebaseId.decode(id));
}
