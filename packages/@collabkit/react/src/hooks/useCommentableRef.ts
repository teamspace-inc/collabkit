import { useCallback, useRef } from 'react';
import { markRaw } from '@collabkit/client';
import { useStore } from './useStore';

export function useCommentableRef(objectId: string) {
  const store = useStore();
  const prevObjectId = useRef(objectId);

  const setElement = useCallback(
    (element: HTMLElement | SVGElement | null) => {
      // if objectId has changed then remove
      // the previous one from the store
      if (prevObjectId.current !== objectId) {
        delete store.commentables[prevObjectId.current];
        prevObjectId.current = objectId;
      }

      if (element) {
        store.commentables[objectId] = { objectId, element: markRaw(element), xStepWidth: 1, xScale: ()=>{} };
      } else {
        delete store.commentables[objectId];
      }
    },
    [store, objectId]
  );

  return setElement;
}
