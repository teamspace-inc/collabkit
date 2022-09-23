import { Thread } from '@collabkit/react';

export function PopoverThreadDemo() {
  return (
    <div
      style={{
        flex: 1,
        margin: '0px -20px',
        background: 'cyan',
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          height: '480px',
          width: '320px',
        }}
      >
        <Thread threadId={'test'} style={{ width: 320 }} />
      </div>
    </div>
  );
}
