import { useCallback, useEffect } from 'react';
import { useStore } from './useStore';

export function useCommentableRef(objectId: string) {
  const store = useStore();

  const setElement = useCallback(
    (element: HTMLElement | SVGElement | null) => {
      console.log('setElement', objectId, element);
      if (element) {
        store.commentableElements[objectId] = element;
      } else {
        delete store.commentableElements[objectId];
      }
    },
    [store]
  );

  return setElement;
}
