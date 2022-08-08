import { styled } from '@stitches/react';
import { Route } from 'wouter';
import { Home } from './home/Home';
import { Devs } from './devs/Devs';

const Page = styled('div', {});

export default function App() {
  return (
    <Page>
      <Route path="/" component={Home} />
      <Route path="/devs" component={Devs} />
      <Route path="/signedIn" component={Devs} />
    </Page>
  );
}
