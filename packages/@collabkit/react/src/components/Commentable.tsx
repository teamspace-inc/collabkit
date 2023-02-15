import { Store } from '@collabkit/core';
import { FloatingPortal, FloatingTree } from '@floating-ui/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useCommentableRef } from '../hooks/useCommentableRef';
import { useStore } from '../hooks/useStore';
import * as styles from '../theme/components/Commentable.css';
import { SavedPin, PinCursor } from './Pin';

function findCommentableElement(
  store: Store,
  e: React.PointerEvent
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

export function CommentableRoot(props: { className?: string; children?: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const hoveredElementRef = useRef<HTMLElement | SVGElement | null>(null);
  const store = useStore();
  const { events } = useApp();
  const { userId, uiState, workspaceId, allPins, selectedId, pinsVisible } = useSnapshot(store);

  useEffect(() => {
    store.isPinningEnabled = true;
  }, []);

  const updateCursor = useCallback(
    (e: React.PointerEvent) => {
      if (hoveredElementRef.current) {
        hoveredElementRef.current.classList.remove(styles.activeContainer);
        hoveredElementRef.current = null;
      }
      if (!cursorRef.current || !overlayRef.current) {
        return;
      }
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      store.clientX = e.clientX;
      store.clientY = e.clientY;

      const commentable = findCommentableElement(store, e);

      if (commentable && commentable.element) {
        const { element } = commentable;
        element.classList.add(styles.activeContainer);
        hoveredElementRef.current = element;
        cursorRef.current.style.display = 'block';
        const { left, top, width, height } = element.getBoundingClientRect();
        overlayRef.current.style.left = `${left}px`;
        overlayRef.current.style.top = `${top}px`;
        overlayRef.current.style.width = `${width}px`;
        overlayRef.current.style.height = `${height}px`;
        overlayRef.current.style.display = 'block';
      } else {
        cursorRef.current.style.display = 'none';
        overlayRef.current.style.display = 'none';
      }
    },
    [cursorRef, store]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const commentable = findCommentableElement(store, e);
      if (commentable && commentable.element && workspaceId) {
        const { x, y, width, height } = commentable.element.getBoundingClientRect();
        events.onPointerDown(e, {
          target: {
            type: 'overlay',
            objectId: commentable.objectId,
            x: (e.clientX - x) / width,
            y: (e.clientY - y) / height,
          },
        });
      }
    },
    [events.onPointerDown, workspaceId]
  );

  if (props.children == null || !workspaceId) {
    return null;
  }

  if (!userId) {
    return null;
  }

  const pinCursor = uiState === 'selecting' && (
    <>
      <div ref={overlayRef} className={styles.overlay} />
      <PinCursor isSelected={false} ref={cursorRef} />
    </>
  );

  const pins =
    pinsVisible && allPins
      ? allPins.map((pin) => {
          return (
            <SavedPin
              key={pin.id}
              pin={pin}
              isSelected={selectedId?.type === 'pin' && selectedId.id === pin.id}
            />
          );
        })
      : [];

  return (
    <div
      onPointerOver={updateCursor}
      onPointerMove={updateCursor}
      onPointerOut={updateCursor}
      onPointerDown={onPointerDown}
      className={props.className}
    >
      {props.children}
      <FloatingPortal id="collabkit-floating-root">
        <FloatingTree>
          {pinCursor}
          {pins}
        </FloatingTree>
      </FloatingPortal>
    </div>
  );
}

function CommentableContainer({
  children,
  objectId,
}: {
  children?: React.ReactNode;
  objectId: string;
}) {
  const ref = useCommentableRef(objectId);
  return <div ref={ref}>{children}</div>;
}

export const Commentable = {
  Root: CommentableRoot,
  Container: CommentableContainer,
};
