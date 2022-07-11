import React, { useCallback, useEffect, useRef } from 'react';
import { styled } from './UIKit';

export const StyledStickyContainer = styled('div', {
  position: 'fixed',
  left: 0,
  top: 0,
});

export function calculatePosition(node: Element, offset: { x: number; y: number }) {
  const rect = node.getBoundingClientRect();
  const x = rect.left + offset.x * rect.width;
  const y = rect.top + offset.y * rect.height;
  return { x, y };
}

// positions children relative to the selector and point
export function Sticky(props: {
  children: React.ReactNode;
  selector: string;
  offset: { x: number; y: number };
}) {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const selectorRef = useRef<Element | null>(null);
  const { children, selector, offset } = props;
  const prevPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    if (stickyRef.current && selectorRef.current) {
      const position = calculatePosition(selectorRef.current, offset);
      if (prevPosition.current.x !== position.x || prevPosition.current.y !== position.y) {
        Object.assign(stickyRef.current.style, {
          left: `${position.x}px`,
          top: `${position.y}px`,
        });
      }
      prevPosition.current = position;
    }
  }, [offset]);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    selectorRef.current = document.querySelector(selector);
    updatePosition();
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [selector]);

  return <StyledStickyContainer ref={stickyRef}>{children}</StyledStickyContainer>;
}
