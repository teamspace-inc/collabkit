import * as admin from 'firebase-admin';
import { isValidWorkspaceProfiles } from '../helpers/isValidWorkspaceProfiles';

export async function fetchWorkspaceProfiles(props: { appId: string; workspaceId: string }) {
  const { appId, workspaceId } = props;
  const db = admin.database();
  const profiles = await (await db.ref(`/workspaces/${appId}/${workspaceId}/profiles`).get()).val();
  if (!isValidWorkspaceProfiles(profiles)) {
    throw new Error('invalid workspace profiles');
  }
  return Object.keys(profiles);
}
