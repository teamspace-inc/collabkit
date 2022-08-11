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
import { H2, Link, Page, Text } from '../UIKit';
import { AppListItem } from './AppListItem';

function Org() {
  const { org, apps } = useSnapshot(devStore);
  return (
    <Page>
      <H2>{org?.name}</H2>
      {Object.values(apps).map((app) => {
        return <AppListItem app={app} />;
        // return <Text key={app.appId}>{app.name}</Text>;
      })}
    </Page>
  );
}

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
    signedIn: org ? <Org /> : <CreateOrg />,
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
