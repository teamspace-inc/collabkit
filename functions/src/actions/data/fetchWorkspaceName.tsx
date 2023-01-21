import { ref } from './refs';

export async function fetchWorkspaceName(props: { appId: string; workspaceId: string }) {
  const { appId, workspaceId } = props;
  const snapshot = await ref`/workspaces/${appId}/${workspaceId}/name`.get();
  const workspaceName = await snapshot.val();
  if (typeof workspaceName !== 'string') {
    console.debug('invalid workspace name, exiting', workspaceName);
    throw new Error('invalid workspace name');
  }
  return {
    workspaceName,
  };
}
