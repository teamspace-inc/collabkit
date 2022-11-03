import React, { cloneElement, useCallback, useMemo, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  offset,
  safePolygon,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useHover,
  useInteractions,
} from '@floating-ui/react-dom-interactions';

import { mergeRefs } from 'react-merge-refs';
import { useApp } from '../../hooks/useApp';
import { nanoid } from 'nanoid';
import { useSnapshot } from 'valtio';
import { ThreadInfo, ThreadTarget } from '@collabkit/core';
import { actions } from '@collabkit/client';

import { PopoverThread } from './PopoverThread';
import { PopoverThreadPreview } from './PopoverThreadPreview';

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

type NewPopoverProps = {
  name?: string;
  objectId: string;
  _viewId?: string;
  openOnClick?: boolean;
  autoFocus?: boolean;

  hideComposer?: boolean;
  shouldFlipToKeepInView?: boolean;

  offset?: number;
  padding?: number;
};

export const Popover = (props: NewPopoverProps & { children: React.ReactElement }) => {
  const { name, objectId } = props;

  const viewId =
    '_viewId' in props && props._viewId ? props._viewId : window?.location?.pathname || 'default';

  const threadInfo = useMemo<ThreadInfo>(
    () => ({ name, meta: { viewId, cellId: objectId } }),
    [name, viewId, objectId]
  );
  const threadId = useOpenThread({ viewId, cellId: objectId });
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
          actions.closeThread(store);
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
          actions.closePreview(store);
        }
      }
    },
    [store, target]
  );

  const nodeId = useFloatingNodeId();

  const { reference: previewReference, context: previewContext } = useFloating({
    placement: 'right-start',
    open: previewOpen,
    whileElementsMounted: autoUpdate,
    onOpenChange: setPreviewOpen,
    nodeId,
    middleware: [
      offset(props.offset ?? 4),
      ...(props.shouldFlipToKeepInView ? [flip()] : []),
      size({
        padding: props.padding ?? 12,
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
  const { reference: threadReference, context: threadContext } = useFloating({
    placement: 'right-start',
    open: threadOpen,
    whileElementsMounted: autoUpdate,
    onOpenChange: setThreadOpen,
    nodeId,
    middleware: [
      offset(props.offset ?? 4),
      ...(props.shouldFlipToKeepInView ? [flip()] : []),
      size({
        padding: props.padding ?? 12,
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
    useInteractions([
      useClick(threadContext, {
        // TODO: allow disabling this, if more control is needed
        enabled: props.openOnClick ?? false,
      }),
      useDismiss(threadContext, {
        escapeKey: false,
      }),
    ]);

  const ref = useMemo(
    () => mergeRefs([previewReference, threadReference]),
    [previewReference, threadReference]
  );

  const getProps = (userProps: any) =>
    getPreviewReferenceProps(getThreadReferenceProps({ ref, ...userProps }));

  // const popoverState: 'open' | 'preview' | 'closed' = threadOpen
  //   ? 'open'
  //   : previewOpen
  //   ? 'preview'
  //   : 'closed';

  const context = {
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
    autoFocus: props.autoFocus ?? true,
    hideComposer: props.hideComposer ?? false,
  };

  // todo: make it possible to pass a ref instead
  // of children here...
  const { children } = props;

  const thread = threadContext.open ? (
    <FloatingFocusManager context={threadContext}>
      <div
        ref={threadContext.floating}
        style={{
          position: threadContext.strategy,
          top: threadContext.y ?? 0,
          left: threadContext.x ?? 0,
          outline: 'none',
        }}
        {...getThreadFloatingProps({})}
      >
        {threadId ? (
          <Popover.Thread
            hideComposer={context.hideComposer}
            maxAvailableSize={context.maxAvailableSize}
            threadId={context.threadId ?? context.getNewThreadId()}
            info={context.threadInfo ?? undefined}
            autoFocus={context.autoFocus}
          />
        ) : null}
      </div>
    </FloatingFocusManager>
  ) : null;

  const preview =
    !context.threadContext.open && context.previewContext.open && context.threadId != null ? (
      <FloatingFocusManager context={context.previewContext}>
        <div
          ref={context.previewContext.floating}
          style={{
            position: context.previewContext.strategy,
            top: context.previewContext.y ?? 0,
            left: context.previewContext.x ?? 0,
            outline: 'none',
          }}
          {...context.getPreviewFloatingProps({
            onClick: () => {
              context.setPopoverState('open');
            },
          })}
        >
          {context.threadId ? (
            <PopoverThreadPreview
              threadId={context.threadId}
              info={context.threadInfo ?? undefined}
            />
          ) : null}
        </div>
      </FloatingFocusManager>
    ) : null;

  return (
    <FloatingNode id={nodeId}>
      {cloneElement(children, getProps(children.props))}
      <FloatingPortal>
        {preview}
        {thread}
      </FloatingPortal>
    </FloatingNode>
  );
};

Popover.Preview = PopoverThreadPreview;
Popover.Thread = PopoverThread;
