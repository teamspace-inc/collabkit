import { PopoverThread, usePopoverThread } from '@collabkit/react';

export function App() {
  const { showThread, threadVisible } = usePopoverThread({
    objectId: 'cellA12',
  });

  return (
    <PopoverThread objectId="cellA12" objectName="Q4 P&L">
      <TableCell onClick={() => showThread()} threadVisible={threadVisible} />
    </PopoverThread>
  );
}

function TableCell(props: { onClick: () => void; threadVisible: boolean }) {
  return (
    <div
      onClick={props.onClick}
      style={{
        padding: 20,
        background: 'white',
        cursor: 'pointer',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: props.threadVisible ? '#ccc' : 'transparent',
      }}
    >
      Component
    </div>
  );
}
