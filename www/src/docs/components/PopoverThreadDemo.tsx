import { PopoverTrigger, usePopoverThread } from '@collabkit/react';
import { nanoid } from 'nanoid';

export function PopoverThreadDemo() {
  const cellId = nanoid();
  const { popoverState, setPopoverState, context } = usePopoverThread({
    name: 'test',
    cellId,
  });

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
          width: '100%',
        }}
      >
        <button onClick={() => (popoverState !== 'open' ? setPopoverState('open') : null)}>
          Show popover
        </button>
        <PopoverTrigger context={context}>
          <div style={{ width: 100, padding: 20, background: 'white' }}>Test</div>
        </PopoverTrigger>
      </div>
    </div>
  );
}
