import * as admin from 'firebase-admin';

export async function fetchWorkspaceName(props: { appId: string; workspaceId: string }) {
  const { appId, workspaceId } = props;
  const db = admin.database();
  const workspaceName = await (
    await db.ref(`/workspaces/${appId}/${workspaceId}/name`).get()
  ).val();
  if (typeof workspaceName !== 'string') {
    console.debug('invalid workspace name, exiting', workspaceName);
    throw new Error('invalid workspace name');
  }
  return {
    workspaceName,
  };
}
