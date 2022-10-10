import { useEffect } from 'react';
import { PopoverTrigger, usePopoverThread } from '@collabkit/react';
import { DocDemoContainer } from '../Doc';

export function PopoverThreadDemo() {
  const { setPopoverState, context } = usePopoverThread({
    name: 'test',
    threadId: 'thread4',
    _viewId: 'demo',
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
