import { ref } from './refs';

export async function fetchApiKey(props: { appId: string }) {
  const apiKeys = await (await ref`/apps/${props.appId}/keys/`.get()).val();
  const apiKey = Object.keys(apiKeys)[0];
  if (!apiKey) {
    throw new Error('fetchApiKey: no keys');
  }
  return apiKey;
}
