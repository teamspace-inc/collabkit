import { InboxButton } from '@collabkit/react';

export function InboxButtonDemo(props: { className?: string }) {
  return (
    <div className={props.className}>
      <div
        style={{
          height: '320px',
          width: '280px',
        }}
      >
        <InboxButton
          onClick={() => {
            console.log('clicked inbox button!');
          }}
        />
      </div>
    </div>
  );
}
