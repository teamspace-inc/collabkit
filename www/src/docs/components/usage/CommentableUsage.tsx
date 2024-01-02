import { Commentable } from '@collabkit/react';

export function SomeComponent() {
  return (
    <Commentable.Container objectId="a-stable-unique-id">
      <div>Content</div>
    </Commentable.Container>
  );
}
