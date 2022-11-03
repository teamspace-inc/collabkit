import { usePopoverState, Popover } from '@collabkit/react';

export function App() {
  const objectId = 'snazzy-product-id';

  const [_popoverState, setPopoverState] = usePopoverState({
    objectId,
  });

  return (
    <div>
      <button onClick={() => setPopoverState('open')}>Open Sesame</button>
      <Popover objectId={objectId} name="Snazzy Product Name">
        <div>Hello world</div>
      </Popover>
    </div>
  );
}
