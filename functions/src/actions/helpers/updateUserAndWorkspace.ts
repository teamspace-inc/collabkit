import * as admin from 'firebase-admin';
import { isValidUser } from './isValidUser';
import { deleteUndefinedProps } from './deleteUndefinedProps';
import { WorkspaceProps, UserProps } from '../../types';
import { isValidWorkspace } from './isValidWorkspace';

export async function updateUserAndWorkspace(props: {
  appId: string;
  userId: string;
  workspaceId: string;
  workspace?: WorkspaceProps;
  user: UserProps;
}) {
  const { appId, workspaceId, userId, workspace, user } = props;

  const updates: { [path: string]: object | string | boolean } = {};

  // contains an ancestor of the next set of updates
  // so we need to do this one first
  if (workspaceId !== 'default' && isValidWorkspace(workspace)) {
    await admin
      .database()
      .ref(`/workspaces/${appId}/${workspaceId}/`)
      .update(deleteUndefinedProps(workspace));
  }

  if (isValidUser(user)) {
    updates[`/profiles/${appId}/${userId}/`] = deleteUndefinedProps(user);
    updates[`/workspaces/${appId}/${workspaceId}/profiles/${userId}/`] = true;
  }

  await admin.database().ref('/').update(updates);
}
