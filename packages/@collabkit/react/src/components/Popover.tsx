import React, { cloneElement, useCallback, useEffect, useMemo, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  offset,
  safePolygon,
  size,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useHover,
  useInteractions,
} from '@floating-ui/react-dom-interactions';
import { mergeRefs } from 'react-merge-refs';
import { PopoverThread, PreviewThread } from './PopoverThread';
import { useApp } from '../hooks/useApp';
import { nanoid } from 'nanoid';
import { useSnapshot } from 'valtio';
import { ThreadInfo, ThreadTarget } from '@collabkit/core';
import { actions } from '@collabkit/client';

function useStableId(): [string, () => void] {
  const [id, setId] = useState<string>(() => nanoid());
  const resetId = useCallback(() => {
    setId(nanoid());
  }, []);
  return [id, resetId];
}

function useOpenThread({ viewId, cellId }: { viewId: string; cellId: string }) {
  const { store } = useApp();
  const { workspaceId, workspaces } = useSnapshot(store);
  const openThreads = workspaceId ? workspaces[workspaceId]?.openThreads : {};

  const threadId = Object.entries(openThreads).find(
    ([, { meta }]) => meta.viewId === viewId && meta.cellId === cellId
  )?.[0];

  return threadId ?? null;
}

export function usePopoverThread({ name, cellId }: { name?: string; cellId: string }) {
  const viewId = window?.location?.pathname || 'default';

  const threadInfo = useMemo<ThreadInfo>(
    () => ({ name, meta: { viewId, cellId } }),
    [name, viewId, cellId]
  );
  const threadId = useOpenThread({ viewId, cellId });
  const hasThread = threadId != null;
  const [newThreadId, _resetNewThreadId] = useStableId();
  const getNewThreadId = useCallback(() => newThreadId, [newThreadId]);
  const [maxAvailableSize, setMaxAvailableSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const { store, events } = useApp();
  const { viewingId, previewingId, workspaceId } = useSnapshot(store);
  const threadOpen =
    viewingId?.type === 'thread' && viewingId.threadId === (threadId ?? newThreadId);
  const previewOpen =
    previewingId?.type === 'thread' && previewingId.threadId === (threadId ?? newThreadId);

  const target = useMemo<ThreadTarget | null>(
    () =>
      workspaceId
        ? {
            type: 'thread',
            threadId: threadId ?? newThreadId,
            workspaceId,
          }
        : null,
    [threadId, newThreadId, workspaceId]
  );

  const setPopoverState = useCallback(
    (state: 'open' | 'preview' | 'closed') => {
      if (target) {
        events.onSetPopoverState({ target, state });
      }
    },
    [target]
  );

  const setThreadOpen = useCallback(
    (open: boolean) => {
      if (target) {
        if (open) {
          actions.viewThread(store, { target, isPreview: false });
        } else {
          actions.closeThread(store, { isPreview: false });
        }
      }
    },
    [store, target]
  );
  const setPreviewOpen = useCallback(
    (open: boolean) => {
      if (target) {
        if (open) {
          actions.viewThread(store, { target, isPreview: true });
        } else {
          actions.closeThread(store, { isPreview: true });
        }
      }
    },
    [store, target]
  );

  const nodeId = useFloatingNodeId();

  const { reference: previewReference, context: previewContext } = useFloating({
    placement: 'right-start',
    open: previewOpen,
    onOpenChange: setPreviewOpen,
    nodeId,
    middleware: [offset(5), flip()],
  });
  const { reference: threadReference, context: threadContext } = useFloating({
    placement: 'right-start',
    open: threadOpen,
    whileElementsMounted: autoUpdate,
    onOpenChange: setThreadOpen,
    nodeId,
    middleware: [
      offset(4),
      flip(),
      size({
        padding: 12,
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
          setMaxAvailableSize({ width: availableWidth, height: availableHeight });
        },
      }),
    ],
  });

  const { getReferenceProps: getPreviewReferenceProps, getFloatingProps: getPreviewFloatingProps } =
    useInteractions([
      useHover(previewContext, {
        enabled: hasThread && !viewingId,
        handleClose: safePolygon(),
      }),
      useDismiss(previewContext),
    ]);
  const { getReferenceProps: getThreadReferenceProps, getFloatingProps: getThreadFloatingProps } =
    useInteractions([useDismiss(threadContext)]);

  const ref = useMemo(
    () => mergeRefs([previewReference, threadReference]),
    [previewReference, threadReference]
  );

  const getProps = (userProps: any) =>
    getPreviewReferenceProps(getThreadReferenceProps({ ref, ...userProps }));

  const popoverState: 'open' | 'preview' | 'closed' = threadOpen
    ? 'open'
    : previewOpen
    ? 'preview'
    : 'closed';

  return {
    context: {
      nodeId,
      getProps,
      threadContext,
      previewContext,
      getThreadFloatingProps,
      getPreviewFloatingProps,
      setPopoverState,
      threadId,
      threadInfo,
      getNewThreadId,
      maxAvailableSize,
    },

    hasThread,
    popoverState,
    setPopoverState,
  };
}

interface Props {
  children: JSX.Element;
  context: ReturnType<typeof usePopoverThread>['context'];
}

export const PopoverTrigger = ({ children, context }: Props) => {
  const {
    getProps,
    threadContext,
    previewContext,
    getThreadFloatingProps,
    getPreviewFloatingProps,
    setPopoverState,
    threadId,
    threadInfo,
    getNewThreadId,
    nodeId,
  } = context;
  const { theme } = useApp();
  return (
    <FloatingNode id={nodeId}>
      {cloneElement(children, getProps(children.props))}
      <FloatingPortal>
        {threadContext.open && (
          <FloatingFocusManager context={threadContext}>
            <div
              ref={threadContext.floating}
              className={theme.className}
              style={{
                position: threadContext.strategy,
                top: threadContext.y ?? 0,
                left: threadContext.x ?? 0,
                outline: 'none',
                boxSizing: 'border-box',
              }}
              {...getThreadFloatingProps()}
            >
              <PopoverThread
                maxAvailableSize={context.maxAvailableSize}
                threadId={threadId ?? getNewThreadId()}
                info={threadInfo}
                style={{
                  boxSizing: 'border-box',
                  // custom styles for cashboard
                  // todo: extract them
                  boxShadow:
                    '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
                  borderRadius: '12px',
                  width: 264,
                  border: '1px solid #E3E9ED',
                }}
              />
            </div>
          </FloatingFocusManager>
        )}
        {!threadContext.open && previewContext.open && threadId != null && (
          <FloatingFocusManager context={previewContext}>
            <div
              ref={previewContext.floating}
              className={theme.className}
              style={{
                position: previewContext.strategy,
                top: previewContext.y ?? 0,
                left: previewContext.x ?? 0,
                outline: 'none',
              }}
              onClick={() => {
                setPopoverState('open');
              }}
              {...getPreviewFloatingProps()}
            >
              <PreviewThread
                threadId={threadId}
                info={threadInfo}
                style={{
                  // custom styles for cashboard
                  // todo: extract them
                  width: 264,
                  border: '1px solid #E3E9ED',
                  boxShadow:
                    '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
                }}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </FloatingNode>
  );
};
