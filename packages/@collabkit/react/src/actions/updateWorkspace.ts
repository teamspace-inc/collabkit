import { update, set, ref } from 'firebase/database';
import { getConfig } from '.';
import { DB, Store } from '../constants';

export async function updateWorkspace(
  store: Store,
  props: { workspace: { id: string; name?: string } }
) {
  const { appId, userId } = getConfig(store);
  let workspace = props.workspace;

  // only if the user has explicitly passed name do
  // we want to apply it as a change
  if (props.workspace.hasOwnProperty('name')) {
    workspace.name = props.workspace.name;
  }

  await update(ref(DB, `/workspaces/${appId}/${workspace.id}/`), workspace);
  await set(ref(DB, `/workspaces/${appId}/${workspace.id}/profiles/${userId}`), true);
}
