import { useCallback, useEffect, useRef } from 'react';
import { markRaw } from '@collabkit/client';
import { useStore } from './useStore';

export function useCommentableRef(objectId: string) {
  const store = useStore();
  const prevObjectId = useRef(objectId);

  useEffect(() => {
    // if objectId has changed then remove
    // the previous one from the store
    if (prevObjectId.current !== objectId) {
      delete store.commentables[prevObjectId.current];
      prevObjectId.current = objectId;
      store.commentables[objectId] = { objectId, element: null };
    }

    () => delete store.commentables[objectId];
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
