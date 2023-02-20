import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { createUserToken, getUserToken } from '../../../../packages/@collabkit/node/src/index';

type Data = { token: string } | { error: string };

const CLIENT_ID = '927079647438-3ug3d9s4pocobg9qve8eb6bk0bifpfrg.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

async function verify(token: string) {
  console.log('Verifying token', token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error('Failed to get payload');
  const { sub, name, picture, email } = payload;
  return {
    id: sub,
    name,
    email,
    avatar: picture,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const appId = process.env.DEMO_COLLABKIT_APP_ID;
    const apiKey = process.env.DEMO_COLLABKIT_API_KEY;
    if (!appId || !apiKey) {
      throw new Error('DEMO_COLLABKIT_APP_ID and DEMO_COLLABKIT_API_KEY must be set in env');
    }

    const { credential } = req.body;
    console.log(req.body);
    if (!credential) {
      res.status(400).json({ error: 'credential is required' });
      return;
    }
    const { id, ...user } = await verify(credential);

    // This creates the user and workspace if they don't exist
    // TODO: Switch to using api.collabkit.dev/v1 once it's ready
    const result = await getUserToken({
      appId: appId,
      apiKey: apiKey,
      workspaceId: 'demo',
      userId: id,
      user,
      workspace: {
        name: 'Demo Workspace',
      },
    });
    if (result?.status !== 201) {
      res.status(400).json({ error: 'Failed update user and workspace' });
    }

    const token = createUserToken({
      apiKey,
      userId: id,
      workspaceId: 'demo',
    });
    res.status(201).json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Authentication failed' });
  }
}
