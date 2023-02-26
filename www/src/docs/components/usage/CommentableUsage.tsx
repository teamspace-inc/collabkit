import { Commentable } from '@collabkit/react';

export function SomeComponent() {
  return (
    <Commentable objectId="a-stable-unique-id">
      <div>Content</div>
    </Commentable>
  );
}
