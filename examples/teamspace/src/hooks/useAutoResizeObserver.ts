import { inputs, TLAutoResizeConstraints, TLAutoResizeInfo } from '@tldraw/core';
import { useEffect, RefObject } from 'react';
import { ShapeTarget } from 'state/constants';

interface UseAutoResizeObserverProps {
  target: ShapeTarget;
  ref: RefObject<HTMLElement>;
  shouldObserve: boolean;
  constraints: TLAutoResizeConstraints[];
  onResize: (info: TLAutoResizeInfo<ShapeTarget>) => void;
}

export function useAutoResizeObserver({
  target,
  ref,
  shouldObserve,
  constraints,
  onResize,
}: UseAutoResizeObserverProps) {
  useEffect(() => {
    if (ref.current) {
      const el = ref.current;

      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentBoxSize) {
            // Firefox implements `contentBoxSize` as a single content rect, rather than an array
            const contentBoxSize = Array.isArray(entry.contentBoxSize)
              ? entry.contentBoxSize[0]
              : entry.contentBoxSize;

            const info = inputs.autoResize(
              {
                width: Math.round(contentBoxSize.inlineSize),
                height: Math.round(contentBoxSize.blockSize),
              },
              target,
              constraints
            );

            onResize(info);
          }
        }
      });

      if (shouldObserve) {
        observer.observe(el);
      } else {
        observer.unobserve(el);
      }

      return () => {
        observer.unobserve(el);
      };
    }

    return;
  }, [ref.current, shouldObserve, target, inputs, onResize]);
}
