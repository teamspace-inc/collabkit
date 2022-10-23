import { useEffect } from 'react';
import { PopoverTrigger, usePopoverThread } from '@collabkit/react';
import { DocDemoContainer } from '../Doc';
import { vars } from '../../styles/Theme.css';

export function PurePopoverThreadDemo() {
  const { setPopoverState, context } = usePopoverThread({
    name: 'test',
    cellId: 'thread4',
    _viewId: 'demo',
  });

  useEffect(() => {
    setPopoverState('open');
  }, []);
  return (
    <div>
      <PopoverTrigger context={context}>
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
      </PopoverTrigger>
    </div>
  );
}

export function PopoverThreadDemo() {
  return (
    <DocDemoContainer style={{ padding: '100px 20px 240px', background: vars.color.purple }}>
      <PurePopoverThreadDemo />
    </DocDemoContainer>
  );
}
