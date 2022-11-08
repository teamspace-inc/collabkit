import React, { useCallback, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { Target } from '@collabkit/core';

export function useHovering(ref: React.RefObject<HTMLElement>, target: Target) {
  const { store } = useApp();
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
    store.hoveringId = null;
  }, [store]);

  const handleMouseOver = useCallback(() => {
    setIsHovering(true);
    store.hoveringId = target;
  }, [store, target]);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    node.addEventListener('mouseover', handleMouseOver);
    node.addEventListener('mouseout', handleMouseOut);

    return () => {
      node.removeEventListener('mouseover', handleMouseOver);
      node.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return isHovering;
}
