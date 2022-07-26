import { styled } from '@stitches/react';
import { Route } from 'wouter';
import { Home } from './Home';
import { Demo } from './Demo';

const Page = styled('div', {
  // textAlign: 'center',
});

const Title = styled('h1', {});

export default function App() {
  return (
    <Page>
      <Route path="/" component={Home} />
      <Route path="/demo" component={Demo} />
    </Page>
  );
}
