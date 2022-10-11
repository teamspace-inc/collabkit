import { useEffect } from 'react';
import { PopoverTrigger, usePopoverThread } from '@collabkit/react';
import { nanoid } from 'nanoid';
import { DocDemoContainer } from '../Doc';

const cellId = nanoid();

export function PopoverThreadDemo() {
  const { popoverState, setPopoverState, context } = usePopoverThread({
    name: 'test',
    cellId,
  });

  useEffect(() => {
    setPopoverState('open');
  }, []);

  return (
    <DocDemoContainer>
      <div
        style={{
          height: '480px',
          width: '100%',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1665149368357-864968813478?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)',
          backgroundSize: 'cover',
          padding: 20,
          borderRadius: 10,
          position: 'relative',
        }}
      >
        <PopoverTrigger context={context}>
          <button
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              top: 20,
              right: 20,
              position: 'absolute',
            }}
            onClick={() => (popoverState !== 'open' ? setPopoverState('open') : null)}
          >
            Comment
          </button>
        </PopoverTrigger>
      </div>
    </DocDemoContainer>
  );
}