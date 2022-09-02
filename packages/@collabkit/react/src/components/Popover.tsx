import React, { cloneElement, useCallback, useMemo, useState } from 'react';
import {
  offset,
  flip,
  useFloating,
  useInteractions,
  useHover,
  useDismiss,
  useClick,
  FloatingFocusManager,
  FloatingPortal,
  safePolygon,
} from '@floating-ui/react-dom-interactions';
import { mergeRefs } from 'react-merge-refs';
import { PopoverThread } from './PopoverThread';
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

export function usePopoverThread({
  name,
  viewId,
  cellId,
}: {
  name?: string;
  viewId: string;
  cellId: string;
}) {
  const threadInfo = useMemo<ThreadInfo>(
    () => ({ name, meta: { viewId, cellId } }),
    [name, viewId, cellId]
  );
  const threadId = useOpenThread({ viewId, cellId });
  const hasThread = threadId != null;
  const [newThreadId, _resetNewThreadId] = useStableId();
  const getNewThreadId = useCallback(() => newThreadId, [newThreadId]);

  const { store } = useApp();
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

  const { reference: previewReference, context: previewContext } = useFloating({
    placement: 'right-start',
    open: previewOpen,
    onOpenChange: setPreviewOpen,
    middleware: [offset(5), flip()],
  });
  const { reference: threadReference, context: threadContext } = useFloating({
    placement: 'right-start',
    open: threadOpen,
    onOpenChange: setThreadOpen,
    middleware: [offset(5), flip()],
  });

  const { getReferenceProps: getPreviewReferenceProps, getFloatingProps: getPreviewFloatingProps } =
    useInteractions([
      useHover(previewContext, {
        enabled: hasThread && !threadOpen,
        handleClose: safePolygon(),
      }),
    ]);
  const { getReferenceProps: getThreadReferenceProps, getFloatingProps: getThreadFloatingProps } =
    useInteractions([useClick(threadContext), useDismiss(threadContext)]);

  const ref = useMemo(
    () => mergeRefs([previewReference, threadReference]),
    [previewReference, threadReference]
  );

  const getProps = (userProps: any) =>
    getPreviewReferenceProps(getThreadReferenceProps({ ref, ...userProps }));

  const popoverState = threadOpen ? 'threadOpen' : previewOpen ? 'previewOpen' : 'closed';

  return {
    context: {
      getProps,
      threadContext,
      previewContext,
      getThreadFloatingProps,
      getPreviewFloatingProps,
      setThreadOpen,
      threadId,
      threadInfo,
      getNewThreadId,
    },

    hasThread,
    popoverState,
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
    setThreadOpen,
    threadId,
    threadInfo,
    getNewThreadId,
  } = context;
  const { theme } = useApp();
  return (
    <>
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
              }}
              {...getThreadFloatingProps()}
            >
              <PopoverThread
                threadId={threadId ?? getNewThreadId()}
                info={threadInfo}
                isPreview={false}
                style={{
                  width: 264,
                  border: '1px solid #E3E9ED',
                  boxShadow:
                    '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)',
                }}
              />
            </div>
          </FloatingFocusManager>
        )}
        {!threadContext.open && previewContext.open && (
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
              onClick={() => setThreadOpen(true)}
              {...getPreviewFloatingProps()}
            >
              <PopoverThread
                threadId={threadId ?? getNewThreadId()}
                info={threadInfo}
                isPreview={true}
                style={{
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
    </>
  );
};
