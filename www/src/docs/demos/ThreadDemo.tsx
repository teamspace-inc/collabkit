import { Thread } from '@collabkit/react';

export function ThreadDemo(props: { className?: string }) {
  return (
    <div className={props.className}>
      <div
        style={{
          height: 320,
          width: 320,
        }}
      >
        <Thread threadId={'thread3'} autoFocus={false} />
      </div>
    </div>
  );
}
