import { actions } from '@collabkit/client';
import { FloatingPortal, FloatingTree } from '@floating-ui/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { useStore } from '../hooks/useStore';
import * as styles from '../theme/components/Commentable.css';
import { SavedPin } from './Pin';
import { PinCursor } from './PinCursor';
import { findCommentableElement } from './Commentable';

function PinLayer(props: { className?: string; children?: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const hoveredCommentableElementRef = useRef<HTMLElement | SVGElement | null>(null);
  const hoveredUncommentableElementRef = useRef<Element | SVGElement | null>(null);

  const store = useStore();
  const { events } = useApp();
  const { userId, uiState, workspaceId, pins, selectedId, pinsVisible } = useSnapshot(store);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      actions.subscribeOpenPins(store);
    }
  }, [isAuthenticated]);

  const updateCursor = useCallback(
    (e: PointerEvent) => {
      if (hoveredCommentableElementRef.current) {
        hoveredCommentableElementRef.current.classList.remove(styles.activeContainer);
        hoveredCommentableElementRef.current = null;
      }
      if (hoveredUncommentableElementRef.current) {
        hoveredUncommentableElementRef.current.classList.remove(styles.activeContainer);
        hoveredUncommentableElementRef.current = null;
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
        hoveredCommentableElementRef.current = element;
        cursorRef.current.style.opacity = '1.0';
        const { left, top, width, height } = element.getBoundingClientRect();
        overlayRef.current.style.left = `${left}px`;
        overlayRef.current.style.top = `${top}px`;
        overlayRef.current.style.width = `${width}px`;
        overlayRef.current.style.height = `${height}px`;
        overlayRef.current.style.display = 'block';
      } else {
        cursorRef.current.style.opacity = '0.4';
        overlayRef.current.style.display = 'none';
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
          element.classList.add(styles.activeContainer);
          hoveredUncommentableElementRef.current = element;
        }

      }
    },
    [cursorRef, store]
  );

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      const commentable = findCommentableElement(store, e);
      if (commentable && commentable.element && workspaceId) {
        const { x, y, width, height } = commentable.element.getBoundingClientRect();
        events.onClick(e, {
          target: {
            type: 'overlay',
            objectId: commentable.objectId,
            x: (e.clientX - x) / width,
            y: (e.clientY - y) / height,
          },
        });
      }
    },
    [events.onClick, workspaceId]
  );

  useEffect(() => {
    document.addEventListener('pointerover', updateCursor);
    document.addEventListener('pointermove', updateCursor);
    document.addEventListener('pointerout', updateCursor);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerover', updateCursor);
      document.removeEventListener('pointermove', updateCursor);
      document.removeEventListener('pointerout', updateCursor);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [updateCursor, onPointerDown]);

  if (!workspaceId) {
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

  const pinsComponents =
    pinsVisible &&
    pins.open.map((pin) => {
      return (
        <SavedPin
          key={pin.id}
          pin={pin}
          isSelected={
            (selectedId?.type === 'pin' || selectedId?.type === 'commentPin') &&
            selectedId.id === pin.id
          }
        />
      );
    });

  return (
    <FloatingPortal id="collabkit-floating-root">
      <FloatingTree>
        {pinCursor}
        {pinsComponents}
      </FloatingTree>
    </FloatingPortal>
  );
}

export { PinLayer };
