import fetch from 'node-fetch';

const API_HOST = 'https://api.collabkit.dev';

export async function deleteUser(props: {
  appId: string;
  apiKey: string;
  userId: string;
}): Promise<void> {
  const response = await fetch(`${API_HOST}/v1/user/${props.userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      apiKey: props.apiKey,
      appId: props.appId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to delete user, status=${response.status}, ${text}`);
  }
}
