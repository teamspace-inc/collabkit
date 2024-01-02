import fetch from 'node-fetch';

const API_HOST = 'https://test-api.collabkit.dev';

export async function upsertUser(props: {
  appId: string;
  apiKey: string;
  userId: string;
  workspaceId: string;
  user: { name?: string; email?: string; avatar?: string };
}): Promise<{
  avatar?: string;
  color: string;
  email?: string;
  id: string;
  isDeleted?: boolean;
  name?: string;
}> {
  const response = await fetch(`${API_HOST}/v1/user/${encodeURIComponent(props.userId)}`, {
    method: 'PUT',
    body: JSON.stringify({
      apiKey: props.apiKey,
      appId: props.appId,
      workspaceId: props.workspaceId,
      user: props.user,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to add/update user, status=${response.status}, ${text}`);
  }
  return await response.json();
}
