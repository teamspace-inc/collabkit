import * as admin from 'firebase-admin';

export async function fetchApiKey(props: { appId: string }) {
  const db = admin.database();
  const apiKeys = await (await db.ref(`/apps/${props.appId}/keys/`).get()).val();
  const apiKey = Object.keys(apiKeys)[0];
  if (!apiKey) {
    throw new Error('fetchApiKey: no keys');
  }
  return apiKey;
}
