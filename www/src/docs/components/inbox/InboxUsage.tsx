import { Inbox } from '@collabkit/react';

export function App() {
  // position the Inbox on the right side of the screen
  const style = {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    height: '500px',
  };

  return (
    <div style={style}>
      <Inbox />
    </div>
  );
}
