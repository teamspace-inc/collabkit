import { Popover, usePopoverState } from '@collabkit/react';
import { useEffect } from 'react';

export function PopoverDemo() {
  const [popoverState, setPopoverState] = usePopoverState({
    objectId: 'thread4',
  });

  useEffect(() => {
    setPopoverState('open');
  }, []);

  return (
    <div>
      <Popover objectId="thread4" name="test" _viewId="demo" autoFocus={false}>
        <div
          onClick={() => setPopoverState('open')}
          style={{
            padding: '10px 20px',
            marginLeft: '-200px',
            width: '120px',
            borderRadius: '6px',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'rgba(0,0,0,0.3)',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          Component
        </div>
      </Popover>
    </div>
  );
}
