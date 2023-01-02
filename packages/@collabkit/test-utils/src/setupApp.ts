import admin from 'firebase-admin';
import { getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

export async function setupApp({ appId, apiKey }: { appId: string; apiKey: string }) {
  try {
    await admin
      .database()
      .ref('apps')
      .child(appId)
      .set({
        name: 'Test App',
        admins: {},
        keys: { [apiKey]: true },
        mode: 'UNSECURED',
        isEmailDisabled: true,
        defaultNotificationPreference: 'off',
        emailBatchDelayMs: 0,
        logoUrl: '',
        webhook: null,
      });

    const token = await admin
      .auth()
      .createCustomToken(apiKey.toString(), { api: true, appId, mode: 'UNSECURED' });

    await signInWithCustomToken(getAuth(getApp('CollabKit')), token);
  } catch (e) {
    console.error(e, 'Failed to create Test App, some tests will fail');
  }
}
