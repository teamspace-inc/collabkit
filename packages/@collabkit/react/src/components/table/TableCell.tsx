import React, { useRef } from 'react';
import {
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  useHover,
} from '@floating-ui/react-dom-interactions';
import { nanoid } from 'nanoid';
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import type { Target, ThreadTarget, Workspace } from '@collabkit/core';
import { PopoverThread } from '../PopoverThread';
import { useApp } from '../../hooks/useApp';

interface Props {
  children: JSX.Element;
  name?: string;
  viewId: string;
  cellId: string;
}

export function usePopoverThread({
  name,
  viewId,
  cellId,
}: {
  name?: string;
  viewId: string;
  cellId: string;
}) {
  const { store } = useApp();
  const { viewingId, workspaceId, workspaces } = useSnapshot(store);
  const openThreads = workspaceId ? workspaces[workspaceId]?.openThreads : {};

  const threadId = Object.entries(openThreads).find(
    ([_id, { meta }]) => meta.viewId === viewId && meta.cellId == cellId
  )?.[0];

  const newThreadId = useRef<string>();
  if (!newThreadId.current) {
    newThreadId.current = nanoid();
  }
  const open = isThreadWithId(viewingId, threadId ?? newThreadId.current!);
  const { x, y, reference, context } = useFloating({
    open,
    onOpenChange: (open) => {
      if (workspaceId) {
        const target: ThreadTarget = {
          type: 'thread',
          threadId: threadId ?? newThreadId.current!,
          workspaceId,
        };
        if (open) {
          actions.viewThread(store, { target });
        } else if (viewingId?.type === 'thread' && viewingId.threadId === threadId) {
          actions.closeThread(store);
        }
      }
    },
    middleware: [offset(8)],
    placement: 'right-start',
    whileElementsMounted: autoUpdate,
  });

  const hasThread = threadId != null;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useHover(context, { enabled: hasThread }),
    useRole(context),
    useDismiss(context),
  ]);

  const popover = {
    context,
    getFloatingProps,
    info: { name, meta: { viewId, cellId } },
    generateThreadId: () => newThreadId.current!,
    threadId,
    x,
    y,
  };
  return {
    popover,
    getProps: getReferenceProps,
    ref: reference,
    isOpen: open,
    hasThread,
  };
}

export type PopoverContext = ReturnType<typeof usePopoverThread>['popover'];

export function PopoverPortal(props: { popover: PopoverContext }) {
  const { context, generateThreadId, getFloatingProps, info, threadId, x, y } = props.popover;
  const { theme } = useApp();
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  return (
    <FloatingPortal>
      {context.open && (
        <FloatingFocusManager context={context}>
          <div
            ref={context.floating}
            className={theme.className}
            style={{
              position: context.strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            {...getFloatingProps()}
          >
            <PopoverThread
              threadId={threadId ?? generateThreadId()}
              info={info}
              style={{ minWidth: 250, border: '1px solid #ccc' }}
            />
          </div>
        </FloatingFocusManager>
      )}
    </FloatingPortal>
  );
}

function isThreadWithId(target: Target | null, id: string): target is ThreadTarget {
  return target != null && target.type === 'thread' && target.threadId === id;
}
