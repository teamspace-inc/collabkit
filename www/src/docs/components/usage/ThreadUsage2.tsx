import { Thread } from '@collabkit/react';

export function Page() {
  return (
    <div style={{ width: '280px', height: '320px' }}>
      <Thread threadId={'my-thread-id'} />
    </div>
  );
}
