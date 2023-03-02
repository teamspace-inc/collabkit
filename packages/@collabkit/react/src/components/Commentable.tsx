import { Store } from '@collabkit/core';
import React from 'react';
import { useCommentableRef } from '../hooks/useCommentableRef';

export function findCommentableElement(
  store: Store,
  e: PointerEvent
): { objectId: string; element: HTMLElement | SVGElement | null } | null {
  const element = document.elementFromPoint(e.clientX, e.clientY);
  if (element == null) {
    return null;
  }
  const commentable = Object.values(store.commentables).find(
    (commentable) =>
      commentable.element &&
      (commentable.element === element || commentable.element.contains(element))
  );
  return commentable ?? null;
}

function Commentable({ children, objectId }: { children?: React.ReactNode; objectId: string }) {
  const ref = useCommentableRef(objectId);
  return <div ref={ref}>{children}</div>;
}

export { Commentable };
