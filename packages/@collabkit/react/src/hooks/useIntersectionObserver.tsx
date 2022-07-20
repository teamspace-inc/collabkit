import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@stitches/react';

export enum Edge {
  Top = 'top_edge',
  Right = 'right_edge',
  Bottom = 'bottom_edge',
  Left = 'left_edge',
}

export enum Corner {
  TopLeft = 'top_left_corner',
  TopRight = 'top_right_corner',
  BottomRight = 'bottom_right_corner',
  BottomLeft = 'bottom_left_corner',
}

export type Intersection =
  | Corner.TopLeft
  | Corner.TopRight
  | Corner.BottomRight
  | Corner.BottomLeft
  | Edge.Top
  | Edge.Right
  | Edge.Bottom
  | Edge.Left
  | 'none'
  | 'pending';

export const intersectionStyles = css({
  variants: {
    intersection: {
      [Edge.Right]: {
        opacity: 1,
        transform: `translateX(calc(-100% + 1em))`,
      },
      [Edge.Bottom]: {
        opacity: 1,
        transform: `translateY(200%)`,
      },
      [Corner.BottomRight]: {
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

function computeOffsetedRect(
  rect: DOMRectReadOnly,
  intersection: Intersection,
  intersectionOffsets: { [key in Intersection]: { x?: number; y?: number } }
) {
  const offset = { x: 0, y: 0, ...intersectionOffsets[intersection] };
  return {
    ...rect,
    top: rect.top + offset.y,
    left: rect.left + offset.x,
    bottom: rect.bottom + offset.y,
    right: rect.right + offset.x,
    width: rect.width + offset.x,
    height: rect.height + offset.y,
    x: rect.x + offset.x,
    y: rect.y + offset.y,
  };
}

function computeIntersection(
  boundingClientRect: DOMRectReadOnly,
  intersectionRect: DOMRectReadOnly
): Intersection {
  const right = intersectionRect.width - boundingClientRect.width < 0;
  const left = intersectionRect.x - boundingClientRect.x < 0;
  const top = intersectionRect.y - boundingClientRect.y < 0;
  const bottom = intersectionRect.height - boundingClientRect.height < 0;
  const cases = {
    [Corner.BottomLeft]: bottom && left,
    [Corner.BottomRight]: bottom && right,
    [Corner.TopLeft]: top && left,
    [Corner.TopRight]: top && right,
    [Edge.Right]: right,
    [Edge.Left]: left,
    [Edge.Top]: top,
    [Edge.Bottom]: bottom,
    none: true,
  };
  return (Object.keys(cases) as (keyof typeof cases)[]).find(
    (key) => cases[key] === true
  ) as Intersection;
}

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
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      observer.current = new IntersectionObserver(observe, { root });
      observer.current.observe(ref.current);
    }
  }, deps.concat(root));

  return isIntersecting;
}

// export function useIntersectionObserver(
//   props: {
//     ref: RefObject<HTMLElement>;
//     root: Element | Document | null | undefined;
//     offsets: { [key in Intersection]: { x?: number; y?: number } };
//   },
//   deps: any[]
// ) {
//   const { ref, root } = props;

//   const observer = useRef<IntersectionObserver>();
//   const [intersection, setIntersection] = useState<Intersection>('pending');

//   const observe = useCallback((entries: IntersectionObserverEntry[] = []) => {
//     console.log(entries.length);
//     const { boundingClientRect, intersectionRect } = entries[0];
//     const currentIntersection = computeIntersection(boundingClientRect, intersectionRect);
//     const nextRect = computeOffsetedRect(boundingClientRect, currentIntersection, props.offsets);

//     setIntersection(currentIntersection);
//   }, []);

//   useEffect(() => {
//     if (ref.current) {
//       observer.current = new IntersectionObserver(observe, { root });
//       observer.current.observe(ref.current);
//     }
//   }, deps.concat(root));

//   return intersection;
// }
