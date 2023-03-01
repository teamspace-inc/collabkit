import fetch from 'node-fetch';

const API_HOST = 'https://api.collabkit.dev';

export async function upsertWorkspace(props: {
  appId: string;
  apiKey: string;
  workspaceId: string;
  workspace: { name?: string };
}) {
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
  const res = await response.text();
  if (response.ok) {
    return res;
  } else {
    console.error('Failed to upsert workspace', response.status, res);
    return '';
  }
}
