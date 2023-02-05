import { useCallback, useEffect, useRef } from 'react';
import { markRaw } from '@collabkit/client';
import { useStore } from './useStore';

export function useCommentableRef(objectId: string) {
  const store = useStore();
  const prevObjectId = useRef(objectId);

  useEffect(() => {
    // swap out the old objectId for the new one
    if (prevObjectId.current !== objectId) {
      console.log('del', prevObjectId.current);
      delete store.commentables[prevObjectId.current];
      prevObjectId.current = objectId;
      store.commentables[objectId] = { objectId, element: null };
    }
  }, [objectId]);

  const setElement = useCallback(
    (element: HTMLElement | SVGElement | null) => {
      if (element) {
        store.commentables[objectId] = { objectId, element: markRaw(element) };
      } else {
        delete store.commentables[objectId];
      }
    },
    [store]
  );

  return setElement;
}
