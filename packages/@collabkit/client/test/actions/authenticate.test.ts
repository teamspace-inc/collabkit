import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { generateToken } from '../../src/actions/generateToken';
import { setupApp, setupFirebase } from '../../../test-utils/src';

setupFirebase();

test('authenticate', async () => {
  const apiKey = nanoid();
  const appId = nanoid();
  const apiHost = 'https://europe-west2-collabkit-test.cloudfunctions.net/generateToken';
  await setupApp({ apiKey, appId });
  const token = await generateToken({ apiHost, apiKey, appId });
  expect(token).toStrictEqual({
    appId,
    mode: 'UNSECURED',
    token: expect.any(String),
  });
});
