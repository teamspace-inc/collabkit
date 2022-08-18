import { OptionalUserProps, OptionalWorkspaceProps } from '@collabkit/core';
import fetch from 'node-fetch';

export async function getUserToken(props: {
  appId: string;
  apiKey: string;
  workspaceId: string;
  userId: string;
  user: OptionalUserProps;
  workspace: OptionalWorkspaceProps;
}): Promise<
  | {
      status: 201;
      data: {
        appId: string;
        mode: 'SECURED';
        token: string;
        workspaceId: string;
        userId: string;
      };
    }
  | { status: 400; error: string }
  | null
> {
  const credentials = {
    mode: 'SECURED',
    ...props,
  };

  const response = await fetch(`https://token.collabkit.dev`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return (await response.json()) as any;
  } else {
    console.error('Failed to getUserToken', response.status, await response.text());
  }

  return null;
}
