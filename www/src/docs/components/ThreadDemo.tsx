import { Thread } from '@collabkit/react';

export function ThreadDemo() {
  return (
    <div
      style={{
        flex: 1,
        background: 'cyan',
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          minHeight: '480px',
          minWidth: '320px',
        }}
      >
        <Thread threadId={'test'} style={{ width: 320 }} />
      </div>
    </div>
  );
}
