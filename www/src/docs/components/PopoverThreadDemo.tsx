import { PopoverTrigger, usePopoverThread } from '@collabkit/react';
import { nanoid } from 'nanoid';
import { DocDemoContainer } from '../Doc';

export function PopoverThreadDemo() {
  const cellId = nanoid();
  const { popoverState, setPopoverState, context } = usePopoverThread({
    name: 'test',
    cellId,
  });

  return (
    <DocDemoContainer>
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
    </DocDemoContainer>
  );
}
