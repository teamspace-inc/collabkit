import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { CollabKitFirebaseApp, Store } from '../constants';
import { generateToken } from './generateToken';
import { actions, getConfig } from './index';

export async function authenticate(store: Store) {
  const { appId, apiKey, mode } = getConfig(store);
  const auth = await generateToken(appId, apiKey, mode);

  if (auth !== null) {
    store.token = auth.token;

    // use this code to tell the user what mode their app is running in
    // and if it's been configured properly
    //
    try {
      const userCredential = await signInWithCustomToken(
        getAuth(CollabKitFirebaseApp),
        store.token
      );

      const result = await userCredential.user.getIdTokenResult();
      const mode = result.claims.mode;

      console.log('CollabKit authenticated', userCredential, mode);
      await actions.saveProfile(store);
      actions.subscribeProfiles(store);
      actions.subscribeWorkspace(store);
    } catch (e) {
      console.error('CollabKit: failed to sign in', e);
    }
  } else {
    console.error('CollabKit: failed to auth', auth);
  }
}
