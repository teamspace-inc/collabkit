import React, { useCallback, useEffect } from 'react';

export function useHovering(ref: React.RefObject<HTMLElement>) {
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);

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
