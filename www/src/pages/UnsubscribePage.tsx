import { useCallback, useState } from 'react';
import { initializeAuth, inMemoryPersistence, signInWithCustomToken } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import * as styles from '../styles/UnsubscribePage.css';

function isString(s: unknown): s is string {
  return typeof s === 'string';
}

async function authenticate(token: string) {
  const auth = initializeAuth(getApp('CollabKit'), {
    persistence: inMemoryPersistence,
    popupRedirectResolver: undefined,
  });
  const userCredential = await signInWithCustomToken(auth, token);
  const result = await userCredential.user.getIdTokenResult();
  const {
    unsubAppId: appId,
    unsubWorkspaceId: workspaceId,
    unsubProfileId: profileId,
    unsubThreadId: threadId,
  } = result.claims;

  if (!isString(appId) || !isString(workspaceId) || !isString(threadId) || !isString(profileId)) {
    throw new Error('invalid claims: ' + JSON.stringify(result.claims));
  }
  return { appId, workspaceId, threadId, profileId };
}

async function unsubscribe(token: string) {
  const { appId, workspaceId, threadId, profileId } = await authenticate(token);
  await set(
    ref(
      getDatabase(getApp('CollabKit')),
      `/notificationPreferences/${appId}/${workspaceId}/${threadId}/${profileId}/isMuted`
    ),
    true
  );
}

export function UnsubscribePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useHeaderStyle({ theme: 'light', backgroundColor: '#F5F5F5' });

  const onUnsubscribeClick = useCallback(async () => {
    setStatus('loading');
    try {
      const token = new URLSearchParams(window.location.search).get('token');
      if (!token) {
        setStatus('error');
        return;
      }
      await unsubscribe(token);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {(status === 'idle' || status === 'loading') && (
          <>
            <h1 className={styles.title}>Unsubscribe</h1>
            <p className={styles.message}>
              Are you sure you want to unsubscribe from notification emails for this comment thread?
            </p>
            <button
              type="button"
              onClick={onUnsubscribeClick}
              className={styles.button}
              disabled={status === 'loading'}
            >
              Unsubscribe
            </button>
          </>
        )}
        {status === 'success' && (
          <>
            <h1 className={styles.title}>You’ve been unsubscribed</h1>
            <p className={styles.message}>You will no longer receive email about this thread.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className={styles.title}>Unable to unsubscribe</h1>
            <p className={styles.message}>Please try re-opening the link from your email.</p>
          </>
        )}
      </div>
    </div>
  );
}
