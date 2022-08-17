import { API_HOST } from '../constants';
import { FunctionResponse, GenerateToken } from './index';

export async function generateToken(props: { appId: string; apiKey: string }) {
  const { appId, apiKey } = props;
  try {
    const response = await fetch(
      `${API_HOST}/generateToken?apiKey=${apiKey}&appId=${appId}&mode=UNSECURED`
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
