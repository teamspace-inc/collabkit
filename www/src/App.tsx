import { styled } from '@stitches/react';

const Page = styled('div', {
  textAlign: 'center',
});

const Title = styled('h1', {});

export default function App() {
  return (
    <Page>
      <Title>CollabKit</Title>
      <p>Hello world</p>
    </Page>
  );
}
