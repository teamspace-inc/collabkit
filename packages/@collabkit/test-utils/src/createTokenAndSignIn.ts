import admin from 'firebase-admin';
import { getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

export async function createTokenAndSignIn({ apiKey, appId }: { apiKey: string; appId: string }) {
  const token = await admin
    .auth()
    .createCustomToken(apiKey.toString(), { api: true, appId, mode: 'UNSECURED' });
  return signInWithCustomToken(getAuth(getApp('CollabKit')), token);
}
