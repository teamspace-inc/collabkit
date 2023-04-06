import { useSnapshot } from 'valtio';
import { Demo } from './Demo';
import { useAppParams } from './hooks/useAppParams';
import { SignIn } from './SignIn';
import { store } from './store';
import useLocalStorage from 'react-use/lib/useLocalStorage';
import { useEffect } from 'react';

export default function App() {
  const { appId, token, setCredential, isLoading } = useUserToken();

  if (isLoading) return null;

  if (token) {
    return <Demo appId={appId} token={token} />;
  } else {
    return (
      <SignIn
        onSuccess={(credentialResponse) => {
          const { credential } = credentialResponse;
          if (credential) {
            setCredential(credential);
          }
        }}
      />
    );
  }
}

function useUserToken() {
  const [credential, setCredential, removeCredential] = useLocalStorage<string>('credential');
  const snapshot = useSnapshot(store);
  const params = useAppParams();
  const token = params.token ?? snapshot.token;
  const shouldFetchToken = !token && !!credential;

  useEffect(() => {
    if (shouldFetchToken) {
      const authenticate = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_HOST}/api/authenticate`, {
            method: 'POST',
            body: JSON.stringify({ credential }),
            headers: {
              'content-type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to authenticate');
          const result = await response.json();
          store.token = result.token;
        } catch (e) {
          console.error(e);
          removeCredential();
        }
      };
      authenticate();
    }
  }, [token, credential]);

  return { appId: params.appId, token, setCredential, isLoading: shouldFetchToken };
}
