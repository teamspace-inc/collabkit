import { Thread } from '@collabkit/react';

export function ThreadDemo(props: { className?: string }) {
  return (
    <div className={props.className}>
      <div
        style={{
          height: '320px',
          width: '280px',
        }}
      >
        <Thread threadId={'thread3'} style={{ width: 320 }} autoFocus={false} />
      </div>
    </div>
  );
}
