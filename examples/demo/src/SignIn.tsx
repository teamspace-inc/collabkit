import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { store } from './store';

export function SignIn() {
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
          onSuccess={async (credentialResponse) => {
            const { credential } = credentialResponse;
            if (credential) {
              const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/authenticate`, {
                method: 'POST',
                body: JSON.stringify({ credential }),
                headers: {
                  'content-type': 'application/json',
                },
              });
              const result = await response.json();
              store.token = result.token;
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
}
