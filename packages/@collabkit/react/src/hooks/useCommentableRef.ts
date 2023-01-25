import { useCallback } from 'react';
import { markRaw } from '@collabkit/client';
import { useStore } from './useStore';

export function useCommentableRef(objectId: string) {
  const store = useStore();

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
