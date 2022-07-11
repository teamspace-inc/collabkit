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

      console.log('mode', mode);
      console.log('signed in', userCredential);
    } catch (e) {
      console.error('failed to sign in', e);
    }

    // todo handle spotty network
    try {
      // this should be an onValue sub
      actions.subscribeProfiles(store);
    } catch (e) {
      console.error('collabkit.setup failed', e);
    }
  } else {
    console.error('failed to auth', auth);
  }
}
