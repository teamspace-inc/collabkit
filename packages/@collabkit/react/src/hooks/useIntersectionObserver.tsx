import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@stitches/react';

export enum TLBoundsEdge {
  Top = 'top_edge',
  Right = 'right_edge',
  Bottom = 'bottom_edge',
  Left = 'left_edge',
}

export enum TLBoundsCorner {
  TopLeft = 'top_left_corner',
  TopRight = 'top_right_corner',
  BottomRight = 'bottom_right_corner',
  BottomLeft = 'bottom_left_corner',
}

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
        transform: `translateY(200%)`,
      },
      [TLBoundsCorner.BottomRight]: {
        opacity: 1,
        transform: `translateY(200%)`,
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

export function useIsIntersecting(
  props: {
    ref: RefObject<HTMLElement>;
    root: Element | Document | null | undefined;
  },
  deps: any[]
) {
  const { ref, root } = props;

  const observer = useRef<IntersectionObserver>();
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const observe = useCallback((entries: IntersectionObserverEntry[] = []) => {
    const { isIntersecting } = entries[0];
    setIsIntersecting(isIntersecting);
  }, []);

  useEffect(() => {
    if (ref.current) {
      observer.current = new IntersectionObserver(observe, { root });
      observer.current.observe(ref.current);
    }
  }, deps.concat(root));

  return isIntersecting;
}

export function useIntersectionObserver(
  props: {
    ref: RefObject<HTMLElement>;
    root: Element | Document | null | undefined;
  },
  deps: any[]
) {
  const { ref, root } = props;

  const observer = useRef<IntersectionObserver>();
  const [intersectsEdge, setIntersectsEdge] = useState<Intersection>('pending');

  const observe = useCallback((entries: IntersectionObserverEntry[] = []) => {
    const { boundingClientRect, intersectionRect } = entries[0];
    if (
      intersectionRect.width <= boundingClientRect.width &&
      intersectionRect.height <= boundingClientRect.height
    ) {
      setIntersectsEdge(TLBoundsCorner.BottomRight);
    } else if (intersectionRect.width <= boundingClientRect.width) {
      setIntersectsEdge(TLBoundsEdge.Right);
    } else if (intersectionRect.height <= boundingClientRect.height) {
      setIntersectsEdge(TLBoundsEdge.Bottom);
    } else {
      setIntersectsEdge('none');
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      observer.current = new IntersectionObserver(observe, { root });
      observer.current.observe(ref.current);
    }
  }, deps.concat(root));

  return intersectsEdge;
}
