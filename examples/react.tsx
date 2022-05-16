import { CommentButton, Commentable, setup, identify } from '@collabkit/react';

setup('COLLABKIT_API_KEY');
identify({
  id: '123',
  name: 'John Doe',
  avatar: 'https://example.com/avatar.png',
  email: 'john@doe.com',
});

export function App() {
  return (
    <>
      <Commentable id="1" name="Paris">
        <Greeting />
      </Commentable>
      <Commentable id="2" name="London">
        <Greeting />
      </Commentable>
      <CommentButton />
    </>
  );
}

function Greeting() {
  return <p>Hello world</p>;
}
