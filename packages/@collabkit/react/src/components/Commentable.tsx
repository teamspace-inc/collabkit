import { Store } from '@collabkit/core';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { child } from 'firebase/database';
import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useCommentableRef } from '../hooks/useCommentableRef';
import { useStore } from '../hooks/useStore';
import * as styles from '../theme/components/Commentable.css';
import Profile, { Avatar } from './Profile';

function findCommentableElement(
  store: Store,
  e: React.PointerEvent
): HTMLElement | SVGElement | null {
  const element = document.elementFromPoint(e.clientX, e.clientY);
  if (element == null) {
    return null;
  }
  const commentable = Object.values(store.commentableElements).find(
    (el) => el === element || el.contains(element)
  );
  return commentable ?? null;
}

const Pin = forwardRef<HTMLDivElement>(function Pin(_props, ref) {
  const { userId } = useSnapshot(useStore());
  if (userId == null) {
    return null;
  }
  return (
    <Profile.Provider profileId={userId}>
      <div className={styles.pin} ref={ref}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2288 37.4788L30.8539 27.8536C33.7325 24.9751 35.3496 21.0709 35.3496 17C35.3496 12.9291 33.7325 9.02492 30.8539 6.14635L30.8539 6.14633C29.4286 4.72101 27.7365 3.59038 25.8742 2.819C24.0119 2.04762 22.0159 1.6506 20.0002 1.6506C17.9845 1.6506 15.9885 2.04762 14.1263 2.819C12.264 3.59038 10.5719 4.72101 9.14656 6.14633L9.14654 6.14636C7.72122 7.57168 6.59059 9.26378 5.81921 11.126C5.04783 12.9883 4.65081 14.9843 4.65081 17C4.65081 19.0157 5.04783 21.0117 5.81921 22.8739C6.59059 24.7362 7.72122 26.4283 9.14654 27.8536L18.7717 37.4788C19.0975 37.8046 19.5394 37.9877 20.0002 37.9877C20.461 37.9877 20.903 37.8046 21.2288 37.4788Z"
            fill="white"
            stroke="#222222"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.pinAvatar}>
          <Profile.Avatar />
        </div>
      </div>
    </Profile.Provider>
  );
});

export function CommentableRoot(props: { children?: React.ReactNode }) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const hoveredElementRef = useRef<HTMLElement | SVGElement | null>(null);
  const store = useStore();
  const { uiState } = useSnapshot(store);

  const updateCursor = useCallback(
    (e: React.PointerEvent) => {
      if (hoveredElementRef.current) {
        hoveredElementRef.current.classList.remove(styles.activeContainer);
        hoveredElementRef.current = null;
      }
      if (!cursorRef.current || !overlayRef.current) {
        return;
      }
      console.log('updateCursor', e.clientX, e.clientY);
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      store.clientX = e.clientX;
      store.clientY = e.clientY;

      const element = findCommentableElement(store, e);
      if (element) {
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

  if (props.children == null) {
    return null;
  }

  return (
    <div
      onPointerOver={(e) => {
        console.log(`[${uiState}] pointer over: ${e.clientX}, ${e.clientY}`);
        updateCursor(e);
      }}
      onPointerMove={(e) => {
        console.log(`[${uiState}] pointer move: ${e.clientX}, ${e.clientY}`);
        updateCursor(e);
      }}
      onPointerOut={(e) => {
        console.log(`[${uiState}] pointer out: ${e.clientX}, ${e.clientY}`);
        updateCursor(e);
      }}
    >
      {props.children}
      <FloatingPortal id="collabkit-floating-root">
        {uiState === 'selecting' && (
          <>
            <div ref={overlayRef} className={styles.overlay} />
            <Pin ref={cursorRef} />
          </>
        )}
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
