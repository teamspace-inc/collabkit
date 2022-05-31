import '../matrix/browser-matrix.min.js';

// import { createClient } from 'matrix-js-sdk/src/matrix';
const { createClient } = matrixcs;

export { CollabKitPlayground } from './components/index';

const client = createClient('https://matrix.org');

export async function login() {
  const data = await client.login('m.login.password', {
    password: '*********',
    identifier: {
      type: 'm.id.user',
      user: 'villei',
    },
    initial_device_display_name: 'CollabKit Playground',
  });

  return {
    accessToken: data.access_token,
    userId: data.user_id,
    deviceId: data.device_id,
  };
}

(async () => {
  const credentials = await login();
})();
