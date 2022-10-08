import { useEffect } from 'react';
import { PopoverTrigger, usePopoverThread } from '@collabkit/react';
import { nanoid } from 'nanoid';
import { DocDemoContainer } from '../Doc';

const cellId = nanoid();

export function PopoverThreadDemo() {
  const { setPopoverState, context } = usePopoverThread({
    name: 'test',
    cellId,
  });

  useEffect(() => {
    setPopoverState('open');
  }, []);

  return (
    <DocDemoContainer style={{ padding: '100px 20px' }}>
      <div>
        <PopoverTrigger context={context}>
          <div
            onClick={() => setPopoverState('open')}
            style={{
              padding: '10px 20px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Component
          </div>
        </PopoverTrigger>
      </div>
    </DocDemoContainer>
  );
}
