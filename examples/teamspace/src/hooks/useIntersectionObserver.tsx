import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { TLBoundsCorner, TLBoundsEdge } from '@tldraw/core';
import { css } from '@stitches/react';

export type Intersection =
  | TLBoundsCorner.BottomRight
  | TLBoundsEdge.Bottom
  | TLBoundsEdge.Right
  | 'none'
  | 'pending';

export const intersectionStyles = css({
  variants: {
    intersection: {
      [TLBoundsEdge.Right]: {
        opacity: 1,
        transform: `translateX(calc(-100% + 1em))`,
      },
      [TLBoundsEdge.Bottom]: {
        opacity: 1,
        transform: `translateY(calc(-100% - 2em))`,
      },
      [TLBoundsCorner.BottomRight]: {
        opacity: 1,
        transform: `translate(-100%, -100%)`,
      },
      none: {
        opacity: 1,
      },
      pending: {
        opacity: 0,
      },
    },
  },
});

export function useIntersectionObserver(ref: RefObject<HTMLElement>, deps: any[]) {
  const intersectionObserver = useRef<IntersectionObserver>();
  const [intersectsEdge, setIntersectsEdge] = useState<Intersection>('pending');

  const observe = useCallback((entries = []) => {
    const { boundingClientRect, intersectionRect } = entries[0];
    if (
      intersectionRect.width < boundingClientRect.width &&
      intersectionRect.height < boundingClientRect.height
    ) {
      setIntersectsEdge(TLBoundsCorner.BottomRight);
    } else if (intersectionRect.width < boundingClientRect.width) {
      setIntersectsEdge(TLBoundsEdge.Right);
    } else if (intersectionRect.height < boundingClientRect.height) {
      setIntersectsEdge(TLBoundsEdge.Bottom);
    } else {
      setIntersectsEdge('none');
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      intersectionObserver.current = new IntersectionObserver(observe, { root: null });
      intersectionObserver.current.observe(ref.current);
    }
  }, deps);

  return intersectsEdge;
}
