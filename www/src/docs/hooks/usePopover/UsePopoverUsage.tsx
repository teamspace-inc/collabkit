import { useEffect } from 'react';
import { PopoverThread, usePopoverThread } from '@collabkit/react';

export function App() {
  const objectId = 'fox-fabrics';

  const { showThread } = usePopoverThread({
    objectId,
  });

  // automatically open the popover thread on mount
  useEffect(() => showThread(), []);

  return (
    <div>
      {/* show the popover when the user clicks this button */}
      <button onClick={() => showThread()}>Comment</button>
      <PopoverThread objectId={objectId} objectName="Fox Fabrics">
        <div>
          <h1>Fox Fabrics</h1>
        </div>
      </PopoverThread>
    </div>
  );
}
