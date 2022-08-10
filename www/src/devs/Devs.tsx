import { devStore } from './devStore';
import { useSnapshot } from 'valtio';

import { CreateOrg } from './forms/CreateOrg';
import { EnterEmail } from './forms/EnterEmail';
import { CheckEmail } from './forms/CheckEmail';

import { StickyHeader } from '../StickyHeader';
import { Logo } from '../Logo';
import { useEffect } from 'react';
import { devActions } from './devActions';

import { signOut } from 'firebase/auth';
import { auth } from './database';
import { Link } from '../UIKit';

export function Devs() {
  const { authState, org } = useSnapshot(devStore);

  useEffect(() => {
    if (window.location.href.includes('signedIn')) {
      devActions.verifyEmailLink();
    }
  }, []);

  const view = {
    blank: <></>,
    signedOut: <EnterEmail />,
    signedIn: org ? <>You've got an org!</> : <CreateOrg />,
    magicLinkSent: <CheckEmail />,
    confirmEmailPrompt: <EnterEmail isReentry={true} />,
  };

  return (
    <div>
      <StickyHeader
        style={{ marginTop: '1.5rem' }}
        left={<Logo onClick={() => (window.location.href = '/')} />}
        right={
          authState === 'signedIn' ? (
            <Link style={{ fontSize: '1.25rem' }} href="#" onClick={() => signOut(auth)}>
              Sign out
            </Link>
          ) : null
        }
      />
      {view[authState]}
    </div>
  );
}
