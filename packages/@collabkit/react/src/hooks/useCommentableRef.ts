import { useCallback } from 'react';
import { markRaw } from '@collabkit/client';
import { useStore } from './useStore';

export function useCommentableRef(
  objectId: string,
  {
    transformCoordinates,
  }: {
    transformCoordinates?: (e: { clientX: number; clientY: number }) => { x: number; y: number };
  } = {}
) {
  const store = useStore();

  const setElement = useCallback(
    (element: HTMLElement | SVGElement | null) => {
      console.log('useCommentableRef', objectId, element);
      if (element) {
        store.commentables[objectId] = {
          objectId,
          element: markRaw(element),
          transformCoordinates,
        };
      } else {
        delete store.commentables[objectId];
      }
    },
    [store]
  );

  return setElement;
}
