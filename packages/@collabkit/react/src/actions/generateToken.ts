import { API_HOST } from '../constants';
import { FunctionResponse, GenerateToken } from './index';

// todo make this work in secured mode
export async function generateToken(appId: string, apiKey: string, mode: 'SECURED' | 'UNSECURED') {
  try {
    const response = await fetch(
      `${API_HOST}/generateToken?apiKey=${apiKey}&appId=${appId}&mode=${mode}`
    );

    if (response.ok) {
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
