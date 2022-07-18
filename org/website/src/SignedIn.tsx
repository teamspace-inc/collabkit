import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { store } from './store';
import { verifyEmailLink } from './verifyEmailLink';

export function SignedIn() {
  useEffect(() => {
    verifyEmailLink();
  }, []);

  const { user } = useSnapshot(store);

  return (
    <div>
      <h1>Signed in {user?.email}</h1>
    </div>
  );
}
