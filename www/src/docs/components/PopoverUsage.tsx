import { Popover, usePopoverState } from '@collabkit/react';

function YourComponent(props: { onClick: () => void }) {
  return (
    <div
      onClick={props.onClick}
      style={{
        padding: 20,
        background: 'white',
        cursor: 'pointer',
      }}
    >
      Component
    </div>
  );
}

export function App() {
  const [popoverState, setPopoverState] = usePopoverState({
    objectId: 'thread4',
  });

  return (
    <div>
      <Popover objectId={'thread4'} name={'name of thread'}>
        <YourComponent onClick={() => popoverState !== 'open' && setPopoverState('open')} />
      </Popover>
    </div>
  );
}
