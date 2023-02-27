import fetch from 'node-fetch';

const API_HOST = 'https://test-api.collabkit.dev';

export async function upsertUser(props: {
  appId: string;
  apiKey: string;
  userId: string;
  workspaceId: string;
  user: { name?: string; email?: string; avatar?: string };
}) {
  const response = await fetch(`${API_HOST}/v1/user/${props.userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      apiKey: props.apiKey,
      appId: props.appId,
      workspaceId: props.workspaceId,
      user: props.user
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.text();
  if (response.ok) {
    return res;
  } else {
    console.error('Failed to upsert user', response.status, await response.text());
    return '';
  }
}
