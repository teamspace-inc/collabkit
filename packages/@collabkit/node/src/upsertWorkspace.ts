import fetch from 'node-fetch';

const API_HOST = 'https://test-api.collabkit.dev';

export async function upsertWorkspace(props: {
  appId: string;
  apiKey: string;
  workspaceId: string;
  workspace: { name?: string };
}): Promise<void> {
  const response = await fetch(`${API_HOST}/v1/workspace/${props.workspaceId}`, {
    method: 'PUT',
    body: JSON.stringify({
      apiKey: props.apiKey,
      appId: props.appId,
      workspaceId: props.workspaceId,
      workspace: props.workspace,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to add/update workspace, status=${response.status}, ${text}`);
  }
}
