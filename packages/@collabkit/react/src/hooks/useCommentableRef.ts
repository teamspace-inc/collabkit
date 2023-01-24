import { useCallback, useEffect } from 'react';
import { useStore } from './useStore';

export function useCommentableRef(objectId: string) {
  const store = useStore();

  const setElement = useCallback(
    (element: HTMLElement | SVGElement | null) => {
      if (element) {
        store.commentableElements.set(objectId, element);
      } else {
        store.commentableElements.delete(objectId);
      }
    },
    [store]
  );

  return setElement;
}
