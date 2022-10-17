import { devStore } from './devStore';
import { useSnapshot } from 'valtio';

import { CreateOrg } from './forms/CreateOrg';
import { EnterEmail } from './forms/EnterEmail';
import { CheckEmail } from './forms/CheckEmail';

import { StickyHeader } from '../StickyHeader';
import { Logo } from '../Logo';
import { useEffect } from 'react';
import { devActions } from './devActions';

// import { signOut } from 'firebase/auth';
// import { auth } from './database';
// authState === 'signedIn' ? (
//   <Link style={{ fontSize: '1.25rem' }} href="#" onClick={() => signOut(auth)}>
//     Sign out
//   </Link>
// ) : null;
import { styled } from '../UIKit';
import { AppListItem } from './AppListItem';

// import AddAProvider from './code/AddAProvider.mdx';
// import AddAThread from './code/AddAThread.mdx';
// import ImportCollabKit from './code/ImportCollabKit.mdx';
// import InstallCollabKit from './code/InstallCollabKit.mdx';

const H5 = styled('div', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 20,
  lineHeight: '32px',
  margin: '40px 0',
});

const H4 = styled('div', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 20,
  lineHeight: '32px',
  marginBottom: '20px',
  marginTop: '20px',
});

const Desc = styled('div', {
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '24px',
  color: '#999999',
});

function Org() {
  const { org, apps } = useSnapshot(devStore);
  return (
    <div style={{ padding: 60 }}>
      <div>
        Logo
        <div>Projects</div>
        <div>
          <div>{org?.name}</div>
        </div>
      </div>

      <div>
        Project
        <h2>{org?.name}</h2>
      </div>

      <h5>API credentials</h5>

      {/* <H5>How to get started</H5>
      <H4>1. Install CollabKit</H4>
      <InstallCollabKit />

      <H4>2. Import CollabKit</H4>
      <ImportCollabKit />

      <H4>3. Add a Provider</H4>
      <Desc>
        Providers are responsible for authentication, configuration and efficient data syncing.
        You'll typically want one provider that wraps your app.
        <b>
          {' '}
          <br />
          If you have the concept of teams, companies or organisations in your app you'll want to
          configure the Workspace prop to point to the correct workspace for the logged in user.
        </b>
      </Desc>
      <AddAProvider />
      <H4>4. Add a Thread</H4>
      <Desc>Add a comment thread, all you need to do to create one is pass a new threadId.</Desc>
      <AddAThread /> */}

      {Object.values(apps).map((app) => {
        return <AppListItem app={app} />;
        // return <Text key={app.appId}>{app.name}</Text>;
      })}
    </div>
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
        style={{ marginTop: '1.5rem', padding: 0 }}
        left={<Logo onClick={() => (window.location.href = '/')} />}
      />
      {view[authState]}
    </div>
  );
}
