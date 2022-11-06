import { PopoverThread, usePopoverThread } from '@collabkit/react';
import { useEffect } from 'react';
import { vars } from '../../styles/Theme.css';

export function PopoverDemo() {
  const objectId = 'object3';
  const { openPopover } = usePopoverThread({ objectId });
  useEffect(() => {
    openPopover();
  }, []);

  return (
    <div>
      <PopoverThread objectId={objectId}>
        <div
          onClick={() => openPopover()}
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
            color: vars.color.textContrastHigh,
          }}
        >
          Component
        </div>
      </PopoverThread>
    </div>
  );
}
