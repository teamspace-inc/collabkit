import React, { useEffect, useRef } from 'react';
import { useApp } from './App';
import { useSnapshot } from 'valtio';
import './Commentable.css';
import { CollabKit } from '..';

function inspectSize(nodes: HTMLElement[]) {
  const sizeNodes = nodes.filter(hasSize);

  const node = sizeNodes[0];

  if (!node) {
    return;
  }

  node.setAttribute('data-inspx-active', '');

  const { top, left, right, bottom } = node.getBoundingClientRect();

  const marker = document.createElement('inspx');
  marker.innerText = 'Comment';
  marker.setAttribute('type', 'size');

  document.body.appendChild(marker);

  const { width: markerWidth, height: markerHeight } = marker.getBoundingClientRect();

  const x = (left + right) / 2 - markerWidth / 2;
  const y = (top + bottom) / 2 - markerHeight / 2;

  style(marker, getPlacementStylesForPoint({ x, y }));
}

export function uninspect() {
  Array.from(document.querySelectorAll('[data-inspx-active]')).forEach((node) => {
    node.removeAttribute('data-inspx-active');
  });
  Array.from(document.querySelectorAll('inspx')).forEach((marker) => {
    document.body.removeChild(marker);
  });
  Array.from(document.querySelectorAll('margin')).forEach((marker) => {
    document.body.removeChild(marker);
  });
  Array.from(document.querySelectorAll('padding')).forEach((marker) => {
    document.body.removeChild(marker);
  });
}

function isDefined(margin: string) {
  return !!parseInt(margin, 10);
}

function hasSize(node: HTMLElement) {
  const styles = window.getComputedStyle(node);
  return isDefined(styles.width) && isDefined(styles.height);
}

function style(node: HTMLElement, styles: Object) {
  Object.entries(styles).forEach(([key, value]) => {
    node.style.setProperty(key, typeof value === 'number' ? value + 'px' : value);
  });
}

function getPlacementStylesForPoint(point: { x: number; y: number }): React.CSSProperties {
  const x = Math.round(point.x + window.scrollX);
  const y = Math.round(point.y + window.scrollY);
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    minWidth: 'max-content',
    willChange: 'transform',
    transform: `translate3d(${x}px, ${y}px, 0)`,
  };
}

export function Commentable(props: { children: React.ReactNode }) {
  const nodesAtPointerRef = useRef<HTMLElement[]>([]);
  const { store, events } = useApp();
  const { uiState, openId, point } = useSnapshot(store);
  const ref = useRef<HTMLElement>(null);
  const target = { type: 'commentableContainer' } as const;

  useEffect(() => {
    if (uiState !== 'selecting') uninspect();
  }, [uiState]);

  return (
    <span
      style={{ position: 'relative' }}
      ref={ref}
      onPointerDown={(e) => events.onPointerDown(e, { target })}
      onMouseOut={(e) => {
        if (uiState !== 'selecting') {
          return;
        }

        const el = document.elementFromPoint(e.clientX, e.clientY);

        if (el?.tagName === 'INSPX') {
          return;
        }

        if (ref.current?.contains(el)) {
          return;
        }

        uninspect();
      }}
      onMouseOver={(e) => {
        if (uiState !== 'selecting') {
          return;
        }

        e.stopPropagation();

        uninspect();

        const nodes = document.elementsFromPoint(e.clientX, e.clientY) as HTMLElement[];

        nodesAtPointerRef.current = nodes as HTMLElement[];

        if (uiState === 'selecting') {
          inspectSize(nodes);
        }
      }}
    >
      {openId ? (
        <CollabKit.Thread
          type="popout"
          style={{ position: 'fixed', left: point?.x, top: point?.y }}
          threadId={openId.threadId}
          onCloseButtonClick={(e) =>
            events.onClick(e, { target: { ...openId, type: 'closeThreadButton' } as const })
          }
        />
      ) : null}
      {props.children}
    </span>
  );
}
