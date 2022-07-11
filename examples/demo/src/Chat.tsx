import { CollabKit } from '@collabkit/react';

export function Chat() {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 300,
        margin: 16,
        height: 'calc(100vh - 2 * 16px)',
      }}
    >
      <CollabKit.Thread threadId="demo-chat" />
    </div>
  );
}
