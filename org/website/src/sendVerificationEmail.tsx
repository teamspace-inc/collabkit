import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from './database';

export async function sendVerificationEmail(email: string) {
  const actionCodeSettings = {
    url: window.location.origin + '/signedIn',
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
