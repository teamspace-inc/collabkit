import { Inbox } from '@collabkit/react';

export function InboxDemo(props: { className?: string }) {
  return (
    <div
      className={props.className}
      style={{
        padding: 20,
        height: '720px',
        display: 'flex',
        flex: 'unset',
        alignItems: 'flex-start',
        clipPath: 'inset(0px round 6px 6px 6px 6px)',
      }}
    >
      <Inbox />
    </div>
  );
}
