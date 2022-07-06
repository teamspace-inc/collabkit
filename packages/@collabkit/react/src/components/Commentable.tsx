import React, { useRef } from 'react';
// import { getPlacementData, SIDE_OPTIONS } from '@radix-ui/popper';
import { useApp } from './App';
import { useSnapshot } from 'valtio';
import './Commentable.css';

// function createMarkerNode(text: string, type: string, popperOptions: any) {
//   const marker = document.createElement('inspx');
//   marker.innerText = text;
//   marker.setAttribute('type', type);

//   document.body.appendChild(marker);

//   const { width: popperWidth, height: popperHeight } = marker.getBoundingClientRect();

//   const { popperStyles } = getPlacementData({
//     popperSize: { width: popperWidth, height: popperHeight },
//     sideOffset: 8,
//     align: 'center',
//     side: 'top',
//     alignOffset: 0,
//     collisionBoundariesRect: DOMRect.fromRect({
//       width: window.innerWidth,
//       height: window.innerHeight,
//       x: 0,
//       y: 0,
//     }),
//     collisionTolerance: 0,
//     shouldAvoidCollisions: true,
//     ...popperOptions,
//   });

//   Object.entries(popperStyles).forEach(([key, value]) => {
//     marker.style.setProperty(key, value);
//   });
// }

// function createMargin(
//   index: number,
//   value: number,
//   node: HTMLElement,
//   side: 'top' | 'right' | 'bottom' | 'left'
// ) {
//   const margin = document.createElement('margin');

//   const { width: nodeWidth, height: nodeHeight } = node.getBoundingClientRect();

//   const widths = [nodeWidth, value, nodeWidth, value];
//   const heights = [value, nodeHeight, value, nodeHeight];

//   const width = widths[index];
//   const height = heights[index];

//   style(margin, {
//     width,
//     height,
//   });

//   const { popperStyles } = getPlacementData({
//     popperSize: { width, height },
//     sideOffset: 0,
//     align: 'start',
//     side: side,
//     alignOffset: 0,
//     collisionBoundariesRect: DOMRect.fromRect({
//       width: window.innerWidth,
//       height: window.innerHeight,
//       x: 0,
//       y: 0,
//     }),
//     anchorRect: node.getBoundingClientRect(),
//     collisionTolerance: 0,
//     shouldAvoidCollisions: false,
//   });

//   style(margin, popperStyles as any);
//   document.body.appendChild(margin);
// }

// function inspectMargin(nodes: HTMLElement[]) {
//   const marginNodes = nodes.filter(hasMargin);

//   const node = marginNodes[0];

//   if (!node) {
//     return;
//   }

//   node.setAttribute('data-inspx-active', '');

//   const { marginTop, marginRight, marginBottom, marginLeft } = window.getComputedStyle(node);

//   const margins = [marginTop, marginRight, marginBottom, marginLeft].map((m) => parseInt(m, 10));

//   margins.forEach((margin, index) => {
//     if (!margin) {
//       return;
//     }

//     createMarkerNode(String(margin), 'margin', {
//       anchorRect: node.getBoundingClientRect(),
//       side: SIDE_OPTIONS[index],
//       shouldAvoidCollisions: false,
//       sideOffset: margin / 2 - 10,
//     });

//     createMargin(index, margin, node, SIDE_OPTIONS[index]);
//   });
// }

function inspectSize(nodes: HTMLElement[]) {
  const sizeNodes = nodes.filter(hasSize);

  const node = sizeNodes[0];

  if (!node) {
    return;
  }

  node.setAttribute('data-inspx-active', '');

  const { width, height, top, left, right, bottom } = node.getBoundingClientRect();

  const marker = document.createElement('inspx');
  // marker.innerText = `${Math.round(width)} x ${Math.round(height)}`;
  marker.innerText = 'Comment';
  marker.setAttribute('type', 'size');

  document.body.appendChild(marker);

  const { width: markerWidth, height: markerHeight } = marker.getBoundingClientRect();

  const x = (left + right) / 2 - markerWidth / 2;
  const y = (top + bottom) / 2 - markerHeight / 2;

  style(marker, getPlacementStylesForPoint({ x, y }));
}

// function createPadding(node: HTMLElement, paddings: number[]) {
//   const padding = document.createElement('padding');

//   const { width, height, x, y } = node.getBoundingClientRect();

//   style(padding, {
//     ...getPlacementStylesForPoint({ x, y }),
//     width: width,
//     height: height,
//     'border-top-width': paddings[0],
//     'border-right-width': paddings[1],
//     'border-bottom-width': paddings[2],
//     'border-left-width': paddings[3],
//   });

//   document.body.appendChild(padding);
// }

// function inspectPadding(nodes: HTMLElement[]) {
//   const marginNodes = nodes.filter(hasPadding);

//   const node = marginNodes[0];

//   if (!node) {
//     return;
//   }

//   node.setAttribute('data-inspx-active', '');

//   const { paddingTop, paddingRight, paddingBottom, paddingLeft } = window.getComputedStyle(node);

//   const paddings = [paddingTop, paddingRight, paddingBottom, paddingLeft].map((m) =>
//     parseInt(m, 10)
//   );

//   paddings.forEach((padding, index) => {
//     if (!padding) {
//       return;
//     }

//     createMarkerNode(String(padding), 'padding', {
//       anchorRect: node.getBoundingClientRect(),
//       side: SIDE_OPTIONS[index],
//       shouldAvoidCollisions: false,
//       sideOffset: -padding / 2 - 10,
//     });
//   });

//   createPadding(node, paddings);
// }

////////////////////////////////////////////////////////////////////////////////
// Helpers.

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

// function hasMargin(node: HTMLElement) {
//   const styles = window.getComputedStyle(node);

//   return (
//     isDefined(styles.marginTop) ||
//     isDefined(styles.marginRight) ||
//     isDefined(styles.marginBottom) ||
//     isDefined(styles.marginLeft) ||
//     isDefined(styles.margin)
//   );
// }

// function hasPadding(node: HTMLElement) {
//   const styles = window.getComputedStyle(node);

//   return (
//     isDefined(styles.paddingTop) ||
//     isDefined(styles.paddingRight) ||
//     isDefined(styles.paddingBottom) ||
//     isDefined(styles.paddingLeft) ||
//     isDefined(styles.padding)
//   );
// }

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
  const { store } = useApp();
  const { uiState } = useSnapshot(store);
  const ref = useRef<HTMLElement>(null);

  return (
    <span
      ref={ref}
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
      {props.children}
    </span>
  );
}
