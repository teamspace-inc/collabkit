import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { styled } from './UIKit';
import { autoUpdate, computePosition, offset } from '@floating-ui/dom';

export const StyledStickyContainer = styled('div', {
  position: 'absolute',
  left: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  variants: {
    zTop: {
      true: {
        zIndex: 9999,
      },
    },
  },
});

// positions children relative to the selector and point
export function Sticky(props: {
  children: React.ReactNode;
  selector: string;
  offset: { x: number; y: number };
  zTop?: boolean;
}) {
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const selectorRef = useRef<Element | null>(null);
  const { children, selector } = props;
  const prevPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    selectorRef.current = document.querySelector(selector);
    if (!selectorRef.current || !stickyRef.current) return;
    const cleanup = autoUpdate(selectorRef.current, stickyRef.current, () => {
      if (!selectorRef.current || !stickyRef.current) return;
      computePosition(selectorRef.current, stickyRef.current, {
        placement: 'top-start',
        middleware: [
          offset(({ rects }) => {
            return {
              // so the pin is centered
              crossAxis: props.offset.x * rects.reference.width - 16,
              mainAxis: props.offset.y * rects.reference.height - (28 + 18),
            };
          }),
        ],
      }).then(({ x, y }) => {
        // for some reason it returns a -y value
        const absX = Math.abs(x);
        const absY = Math.abs(y);
        if (absX === prevPosition.current.x && absY === prevPosition.current.y) {
          return;
        }
        Object.assign(stickyRef.current!.style, {
          left: `${absX}px`,
          top: `${absY}px`,
        });
        prevPosition.current = { x: absX, y: absY };
      });
    });
    return cleanup;
  }, [selector, props.offset.x, props.offset.y]);

  return (
    <StyledStickyContainer ref={stickyRef} zTop={props.zTop} data-collabkit-internal="true">
      {children}
    </StyledStickyContainer>
  );
}
