'use client';
import React, { useEffect, useRef, useState } from 'react';

export function useHover<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [ref.current]);

  return [ref, isHovered];
}
