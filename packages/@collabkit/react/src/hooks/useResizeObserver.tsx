import { useEffect, RefObject } from 'react';

export function useResizeObserver({
  ref,
  onResize,
}: {
  ref: RefObject<HTMLElement>;
  onResize: (info: { width: number; height: number }) => void;
}) {
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

            const e = {
              width: Math.round(contentBoxSize.inlineSize),
              height: Math.round(contentBoxSize.blockSize),
            };

            onResize(e);
          }
        }
      });

      observer.observe(el);

      return () => {
        observer.unobserve(el);
      };
    }

    return;
  }, [ref.current, onResize]);
}
