import { dashboardStore } from '../dashboardStore';
import { useSnapshot } from 'valtio';

import { CreateOrg } from './forms/CreateOrg';
import { EnterEmail } from './forms/EnterEmail';
import { CheckEmail } from './forms/CheckEmail';

import { useEffect } from 'react';
import { dashboardActions } from '../dashboardActions';

// import { signOut } from 'firebase/auth';
// import { auth } from './database';
// authState === 'signedIn' ? (
//   <Link style={{ fontSize: '1.25rem' }} href="#" onClick={() => signOut(auth)}>
//     Sign out
//   </Link>
// ) : null;

import { docs } from '../../styles/Docs.css';
import { dark } from '../../styles/Theme.css';
import { bg } from '../../styles/Website.css';
import { Org } from './Org';

export function Dashboard() {
  const { authState, org } = useSnapshot(dashboardStore);

  useEffect(() => {
    if (window.location.href.includes('signedIn')) {
      dashboardActions.verifyEmailLink();
    }
  }, []);

  // auth lifecycle
  const view = {
    blank: <></>,
    signedOut: <EnterEmail />,
    signedIn: org ? <Org /> : <CreateOrg />,
    magicLinkSent: <CheckEmail />,
    confirmEmailPrompt: <EnterEmail isReentry={true} />,
  };

  return (
    <div className={`${docs} ${dark} ${bg}`} style={{ height: '100vh' }}>
      {view[authState]}
    </div>
  );
}
