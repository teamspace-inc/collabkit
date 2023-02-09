import { useApp } from '../../../../packages/@collabkit/react/src/hooks/useApp';
import { useCallback, useEffect, useState } from 'react';
import { useNodes, useOnViewportChange, useReactFlow, Viewport } from 'reactflow';

function ViewportListener() {
  const { events, store } = useApp();
  const nodes = useNodes();
  const reactFlowInstance = useReactFlow();
  const viewport = reactFlowInstance.getViewport();
  const [dragging, setDragging] = useState(false);
  const [draggingId, setDraggingId] = useState('');
  let lastViewport: Viewport | null = null;
  useEffect(() => {
    let dragging = false;
    nodes.map((node) => {
      if (node.dragging) {
        dragging = true;
        setDragging(true);
        setDraggingId(node.id);
      }
    });
    if (!dragging) {
      setDragging(false);
    }
    if (store.dragPinUpdate)
      store.dragPinUpdate.map((update) => {
        if (update) update();
      });
  }, [nodes]);

  useEffect(() => {
    if (dragging) {
      events.onReactFlowNodeDrag({ state: 'start', pinObjectId: draggingId });
    } else {
      events.onReactFlowNodeDrag({ state: 'stop', pinObjectId: draggingId });
    }
  }, [dragging, draggingId]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      events.onReactFlowViewportChange({ state: 'stop' });
    }, 200)
    return () => clearTimeout(delayDebounceFn)
  }, [viewport]);

  useOnViewportChange({
    onStart: useCallback((viewport: Viewport) => {
      events.onReactFlowViewportChange({ state: 'start' });
    }, []),
    onEnd: useCallback((viewport: Viewport) => {
      events.onReactFlowViewportChange({ state: 'stop' });
    }, []),
  });

  return null;
}

export default ViewportListener;
