import * as functions from 'firebase-functions';
import { isValidUser } from './isValidUser';
import { deleteUndefinedProps } from './deleteUndefinedProps';
import { WorkspaceProps, UserProps } from '../../types';
import { isValidWorkspace } from './isValidWorkspace';
import shuffle from 'lodash.shuffle';
import { ref } from '../data/refs';

const colors = [
  'amber',
  'blue',
  'bronze',
  'brown',
  'crimson',
  'cyan',
  'gold',
  'grass',
  'gray',
  'green',
  'indigo',
  'lime',
  'mint',
  'olive',
  'orange',
  'pink',
  'plum',
  'purple',
  'mauve',
  'red',
  'sage',
  'sand',
  'sky',
  'slate',
  'teal',
  'tomato',
  'violet',
  'yellow',
];

function getRandomColor(): string {
  return shuffle(colors)[0];
}

type Updates = { [path: string]: object | string | boolean };

export async function updateUserAndWorkspace(props: {
  appId: string;
  userId: string;
  workspaceId: string;
  workspace?: WorkspaceProps;
  user: UserProps;
}) {
  const { appId, workspaceId, userId, workspace, user } = props;
  const workspaceUpdates: Updates = {};
  const updates: Updates = {};

  const colorSnapshot = await ref`/profiles/${appId}/${userId}/color`.get();
  if (!colorSnapshot.exists()) {
    user.color = getRandomColor();
  }

  // contains an ancestor of the next set of updates
  // so we need to do this one first
  if (workspaceId !== 'default' && isValidWorkspace(workspace)) {
    workspaceUpdates[ref.path`/workspaces/${appId}/${workspaceId}/`] =
      deleteUndefinedProps(workspace);
    workspaceUpdates[ref.path`/views/workspaceProfiles/${appId}/${workspaceId}/${userId}`] =
      deleteUndefinedProps(user);
    await ref`/`.update(workspaceUpdates);
  }

  if (isValidUser(user)) {
    updates[ref.path`/profiles/${appId}/${userId}/`] = deleteUndefinedProps(user);
    if (workspaceId !== 'default') {
      updates[ref.path`/workspaces/${appId}/${workspaceId}/profiles/${userId}/`] = true;
    }
  } else if (user != null) {
    functions.logger.warn('Invalid profile. Skipping user profile update.', { user });
  }

  await ref`/`.update(updates);
}
