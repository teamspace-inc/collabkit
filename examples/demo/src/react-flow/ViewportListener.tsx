import { useApp } from '../../../../packages/@collabkit/react/src/hooks/useApp';
import { useCallback, useEffect, useState } from 'react';
import {
  useNodes,
  useNodesState,
  useOnViewportChange,
  useReactFlow,
  useUpdateNodeInternals,
  Viewport,
} from 'reactflow';

function ViewportListener() {
  const { events, store } = useApp();
  const nodes = useNodes();
  const [dragging, setDragging] = useState(false);
  const [draggingId, setDraggingId] = useState('');
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
