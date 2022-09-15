import { styled } from '@stitches/react';
import { Route } from 'wouter';
import { Home } from './home/Home';
import { Devs } from './devs/Devs';
import '@code-hike/mdx/dist/index.css';
import { useEffect } from 'react';
import { DataGridLandingPage } from './pages/DataGridLandingPage';

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
  });

  return (
    <Page>
      <Route path="/" component={Home} />
      <Route path="/devs" component={Devs} />
      <Route path="/signedIn" component={Devs} />
      <Route path="/datagrid" component={DataGridLandingPage} />
    </Page>
  );
}
