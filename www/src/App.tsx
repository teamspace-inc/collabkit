import { styled } from '@stitches/react';
import { Route } from 'wouter';
import { Home } from './home/Home';

const Page = styled('div', {});

export default function App() {
  return (
    <Page>
      <Route path="/" component={Home} />
    </Page>
  );
}
