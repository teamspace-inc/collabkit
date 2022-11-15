import { useCallback, useState } from 'react';
import { initializeAuth, inMemoryPersistence, signInWithCustomToken } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

async function unsubscribe(params: { token: string }) {
  const app = getApp('CollabKit');
  const auth = initializeAuth(getApp('CollabKit'), {
    persistence: inMemoryPersistence,
    popupRedirectResolver: undefined,
  });
  const userCredential = await signInWithCustomToken(auth, params.token);
  const result = await userCredential.user.getIdTokenResult();
  const {
    unsubAppId: appId,
    unsubWorkspaceId: workspaceId,
    unsubProfileId: profileId,
    unsubThreadId: threadId,
  } = result.claims;
  if (!appId || !workspaceId || !threadId || !profileId) {
    throw new Error('invalid claims: ' + JSON.stringify(result.claims));
  }
  await set(
    ref(
      getDatabase(app),
      `/notificationPreferences/${appId}/${workspaceId}/${threadId}/${profileId}/isMuted`
    ),
    true
  );
}

export function UnsubscribePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onUnsubscribeClick = useCallback(async () => {
    setStatus('loading');
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) {
        setStatus('error');
        return;
      }
      await unsubscribe({ token });
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  }, []);

  return (
    <div
      style={{
        margin: '60px auto',
        maxWidth: 800,
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: '700',
        }}
      >
        Unsubscribe
      </h1>
      <p style={{ marginBottom: 8 }}>
        Are you sure you want to unsubscribe from notification emails for this comment thread?
      </p>
      {status === 'idle' && <button onClick={onUnsubscribeClick}>Unsubscribe -&gt;</button>}
      {status === 'loading' && <span>...</span>}
      {status === 'success' && <span>You have been unsubscribed.</span>}
      {status === 'error' && (
        <span>Unable to unsubscribe. Please try re-opening the link from your email.</span>
      )}
    </div>
  );
}
