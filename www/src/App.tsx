import { styled } from '@stitches/react';
import { Route } from 'wouter';
import { Devs } from './devs/Devs';
import { useEffect } from 'react';

import { DataGridPage } from './pages/DataGridPage';
import { HomePage } from './pages/HomePage';
import { Docs } from './docs/Docs';

const Page = styled('div', {});

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
    <Page>
      <Route path="/" component={HomePage} />
      <Route path="/devs" component={Devs} />
      <Route path="/signedIn" component={Devs} />
      <Route path="/datagrid" component={DataGridPage} />
      <Docs />
    </Page>
  );
}
