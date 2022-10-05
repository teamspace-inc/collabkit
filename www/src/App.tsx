import { styled } from '@stitches/react';
import { Route } from 'wouter';
import { Devs } from './devs/Devs';
import { useEffect } from 'react';

import { DataGridPage } from './pages/DataGridPage';
import { HomePage } from './pages/HomePage';
import { Docs } from './docs/Docs';
import { CollabKitProvider } from '@collabkit/react';
import { nanoid } from 'nanoid';
import { SetBreakpointContext } from './hooks/useWindowSize';

const Page = styled('div', {});

// todo generate a new workspace
// for each docs user
const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};

export default function App() {
  useEffect(() => {
    // @ts-expect-error
    window.Intercom('boot', {
      api_base: 'https://api-iam.intercom.io',
      app_id: 'cwr7lgni',
    });

    // @ts-expect-error
    window.Intercom('update');
  }, []);

  return (
    <CollabKitProvider
      apiKey={apiKey}
      appId={appId}
      workspace={workspace}
      user={{ id: nanoid(), name: 'John Doe' }}
      mentionableUsers={[]}
    >
      <SetBreakpointContext>
        <Page>
          <Route path="/" component={HomePage} />
          <Route path="/devs" component={Devs} />
          <Route path="/signedIn" component={Devs} />
          <Route path="/datagrid" component={DataGridPage} />
          <Docs />
        </Page>
      </SetBreakpointContext>
    </CollabKitProvider>
  );
}
