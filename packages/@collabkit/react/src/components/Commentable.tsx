import React, { useEffect, useRef } from 'react';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import './Commentable.css';
import { Pin } from './Pin';
import { finder } from '@medv/finder';
import { Sticky } from './Sticky';
import { useWorkspace } from '../hooks/useWorkspace';

function inspectSize(nodes: HTMLElement[]) {
  const sizeNodes = nodes.filter(hasSize);

  const node = sizeNodes[0];

  if (!node) {
    return;
  }

  node.setAttribute('data-inspx-active', '');

  const { top, left, right, bottom } = node.getBoundingClientRect();

  const marker = document.createElement('inspx');
  // marker.innerText = 'Comment';
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

export function Commentable(props: { children: React.ReactNode; style?: React.CSSProperties }) {
  const nodesAtPointerRef = useRef<HTMLElement[]>([]);
  const { store, events } = useApp();
  const { uiState, viewingId, hoveringId } = useSnapshot(store);
  const ref = useRef<HTMLElement>(null);
  const { workspace, workspaceId } = useWorkspace();
  const pinIds = Object.keys(workspace?.pins || {});

  useEffect(() => {
    if (uiState !== 'selecting') uninspect();
  }, [uiState]);

  return (
    <span
      style={{ ...props.style, cursor: uiState === 'selecting' ? 'crosshair' : 'unset' }}
      // style={{ position: 'relative' }}
      ref={ref}
      onPointerDown={(e) => {
        if (uiState !== 'selecting') return;
        e.stopPropagation();
        e.preventDefault();
        // get position of pointer
        // relative to element
        const nodes = document.elementsFromPoint(e.clientX, e.clientY) as HTMLElement[];

        const el = nodes[0];

        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        let selector = finder(el, { root: ref.current! });
        // console.log('pointer down', x, y, selector);

        // annotate selector with img src
        if (el.tagName === 'IMG') {
          const src = el.getAttribute('src');
          if (selector.endsWith('img')) {
            selector = `${selector}[src="${src}"]`;
          } else {
            selector = `img[src="${src}"]`;
          }
        }

        const target = {
          type: 'commentable',
          workspaceId,
          pin: {
            selector,
            offset: { x, y },
            url: window.location.href.toString(),
          },
        } as const;

        // console.log(target);

        events.onPointerDown(e, { target });
      }}
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

        const internalEl = nodes.find((node) => node.closest('[data-collabkit-internal=true]'));

        //const idEl = nodes.find((node) => node.closest('[data-collabkit-thread-id]'));

        if (internalEl) {
          return;
        }

        if (uiState === 'selecting') {
          inspectSize(nodes);
        }
      }}
    >
      {props.children}
      {pinIds.map((pinId) => {
        const pin = workspace.pins[pinId];
        const isHovering = hoveringId?.type === 'pin' && hoveringId.pinId === pinId;
        const isViewing = viewingId?.type === 'pin' && viewingId?.pinId === pinId;

        return pin.state !== 'resolved' ? (
          <Sticky
            key={pinId}
            selector={pin.selector}
            offset={pin.offset}
            zTop={isViewing || isHovering}
          >
            <Pin pinId={pinId} />
          </Sticky>
        ) : null;
      })}
    </span>
  );
}
