import React, { useRef } from 'react';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { Pin } from './Pin';
import { finder } from '@medv/finder';
import { Sticky } from './Sticky';
import { useWorkspace } from '../hooks/useWorkspace';

export function Commentable(props: { children: React.ReactNode; style?: React.CSSProperties }) {
  const { store, events } = useApp();
  const { uiState, viewingId, hoveringId } = useSnapshot(store);
  const ref = useRef<HTMLElement>(null);
  const { workspace, workspaceId } = useWorkspace();
  const pinIds = Object.keys(workspace?.pins || {});

  return (
    <span
      style={{
        ...props.style,
        cursor: uiState === 'selecting' || uiState === 'continuous' ? 'crosshair' : 'unset',
      }}
      ref={ref}
      onPointerDown={(e) => {
        if (uiState !== 'selecting' && uiState !== 'continuous') return;
        const el = e.target;
        if (!(el instanceof Element)) return;
        if (el.closest('[data-collabkit-internal=true]') != null) return;

        e.stopPropagation();
        e.preventDefault();

        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        let selector = finder(el, { root: ref.current! });

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

        events.onPointerDown(e, { target });
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
