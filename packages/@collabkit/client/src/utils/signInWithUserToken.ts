import has from 'has';

type UserTokenResponse = {
  data: {
    token: string;
  };
};

function isValidResponse(response: unknown): response is UserTokenResponse {
  if (typeof response !== 'object' || response == null || Array.isArray(response)) {
    return false;
  }
  const tokenValid =
    !has(response, 'token') || response.token === null || typeof response.token === 'string';
  return tokenValid;
}

export async function signInWithUserToken(apiHost: string, appId: string, userToken: string) {
  const response = await fetch(`${apiHost}/v1/generateCustomToken`, {
    method: 'POST',
    body: JSON.stringify({
      appId: appId,
      userToken: userToken,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
  if (response.ok && isValidResponse(res)) {
    return res.data.token;
  } else {
    console.error('Failed to generateCustomToken', response.status, await response.text());
    return "";
  }
}
