import admin from 'firebase-admin';

export async function setupApp({ appId, apiKey }: { appId: string; apiKey: string }) {
  return admin
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
}
