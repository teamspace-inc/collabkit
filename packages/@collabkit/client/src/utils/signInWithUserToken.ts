import { API_HOST } from '../constants';

export async function signInWithUserToken(appId: string, userToken: string) {
  const response = await fetch(
    `${API_HOST}/generateCustomToken`,
    {
      method: 'POST',
      body: JSON.stringify({
        appId: appId,
        userToken: userToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.ok) {
    const json = await response.json();
    return json.data.token;
  } else {
    console.error('Failed to generateCustomToken', response.status, await response.text());
  }
}
