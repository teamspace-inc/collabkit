import { CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { store } from './store';

export function SignIn({
  onSuccess,
}: {
  onSuccess: (credentialResponse: CredentialResponse) => void;
}) {
  return (
    <GoogleOAuthProvider clientId="927079647438-3ug3d9s4pocobg9qve8eb6bk0bifpfrg.apps.googleusercontent.com">
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <h1>CollabKit Demo</h1>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
}
