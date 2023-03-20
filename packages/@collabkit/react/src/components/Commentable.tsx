import { CommentableObject, Store } from '@collabkit/core';
import { FloatingPortal } from '@floating-ui/react';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useCommentableRef } from '../hooks/useCommentableRef';
import { ObjectIdContext, useObjectIdContext } from '../hooks/useObjectIdContext';
import { useStore } from '../hooks/useStore';
import * as styles from '../theme/components/Commentable.css';
import { SavedPin, PinCursor } from './Pin';

function findCommentableElement(store: Store, e: React.PointerEvent): CommentableObject | null {
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
        let { x, y, width, height } = commentable.element.getBoundingClientRect();
        if (!commentable.xOffset) {
          commentable.xOffset = 0;
        }
        let xOffset = ((e.clientX - x - commentable.xOffset) / store.commentables[commentable.objectId].xStepWidth);
        if (commentable.type == 'Bar') {
          xOffset += 0.5;
        }
        events.onPointerDown(e, {
          target: {
            type: 'commentable',
            objectId: commentable.objectId,
            x: (e.clientX - x) / width,
            y: (e.clientY - y) / height,
            dataPoint: commentable.dataPoint,
            xOffset: xOffset
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
        {pinCursor}
        {pins}
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
  return (
    <ObjectIdContext.Provider value={objectId}>
      <div ref={ref}>{children}</div>
    </ObjectIdContext.Provider>
  );
}

function CommentableChart(props: any) {
  const store = useStore();
  const yAxisId = Object.keys(props.yAxisMap)[0];
  const yAxis = props.yAxisMap[yAxisId];

  const objectId = useObjectIdContext();
  let xValue: number | null = null;
  let yValue: number | null = null;

  const xStepWidth = props.xAxisMap[0].width / props.tooltipTicks.length;
  store.commentables[objectId].xStepWidth = xStepWidth;
  store.commentables[objectId].xScale = props.xAxisMap[0].scale;
  store.commentables[objectId].type = props.tooltipAxis.realScaleType != "band" ? 'Discrete' : 'Bar';
  
  if (props.activeTooltipIndex != null && props.activeTooltipIndex != -1) {
    xValue = props.tooltipTicks[props.activeTooltipIndex]?.value;
    yValue = yAxis.scale.invert(props.activeCoordinate.y);
    if (xValue != null && yValue != null) {
      store.commentables[objectId].xOffset = props.activeCoordinate.x;
      store.commentables[objectId].dataPoint = { x: xValue, y: yValue };
    }
  }

  return null;
}

export const Commentable = {
  Root: CommentableRoot,
  Container: CommentableContainer,
  Chart: CommentableChart,
};
