import { FunctionResponse, GenerateToken } from './types';

export async function generateToken(props: { appId: string; apiKey: string; apiHost: string }) {
  const { appId, apiKey, apiHost } = props;
  try {
    const response = await fetch(
      `${apiHost}/v1/generateToken?apiKey=${apiKey}&appId=${appId}&mode=UNSECURED`
    );

    if (response.ok) {
      // todo remove this cas
      const json = (await response.json()) as FunctionResponse<GenerateToken>;
      if (json.status === 200 || json.status === 201) {
        return json.data;
      } else {
        console.error(json);
      }
    } else {
      console.error('Failed to generateToken', response.status, await response.text());
    }
  } catch (e) {
    console.error('Failed to generateToken', e);
  }
  return null;
}
