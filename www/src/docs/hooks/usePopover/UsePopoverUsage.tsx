import { useEffect } from 'react';
import { PopoverThread, usePopoverThread } from '@collabkit/react';

export function App() {
  const objectId = 'fox-fabrics';

  const { openPopover } = usePopoverThread({
    objectId,
  });

  // automatically open the popover thread on mount
  useEffect(() => openPopover(), []);

  return (
    <div>
      {/* show the popover when the user clicks this button */}
      <button onClick={() => openPopover()}>Comment</button>
      <PopoverThread objectId={objectId} objectName="Fox Fabrics">
        <div>
          <h1>Fox Fabrics</h1>
        </div>
      </PopoverThread>
    </div>
  );
}
