import React from 'react';
import type { StoryDecorator } from '@ladle/react';
import { PopoverThread } from './PopoverThread';
import { usePopoverThread } from '../hooks/usePopoverThread';

const objectId = 'object-1';

export function Popover() {
  const { showThread } = usePopoverThread({ objectId })
  return <div>
    <PopoverThread objectId={objectId}>
      <button onClick={() => showThread()}>Show Thread</button>
    </PopoverThread>
  </div>
};

export default {
  decorators: [
    (Component) => {
      return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Component />
        </div>
      );
    },
  ] as StoryDecorator[],
};
