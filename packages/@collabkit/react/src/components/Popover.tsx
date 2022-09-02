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
import { ThreadInfo } from '@collabkit/core';

interface Props {
  children: JSX.Element;
  context: ReturnType<typeof usePopoverThread>;
}

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

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { reference: tooltipReference, context: tooltipContext } = useFloating({
    placement: 'right-start',
    open: tooltipOpen,
    onOpenChange: setTooltipOpen,
    middleware: [offset(5), flip()],
  });

  const { reference: menuReference, context: menuContext } = useFloating({
    placement: 'right-start',
    open: menuOpen,
    onOpenChange: setMenuOpen,
    middleware: [offset(5), flip()],
  });

  const { getReferenceProps: getTooltipReferenceProps, getFloatingProps: getTooltipFloatingProps } =
    useInteractions([
      useHover(tooltipContext, {
        enabled: hasThread,
        handleClose: safePolygon(),
      }),
      useDismiss(tooltipContext),
    ]);

  const { getReferenceProps: getMenuReferenceProps, getFloatingProps: getMenuFloatingProps } =
    useInteractions([useClick(menuContext), useDismiss(menuContext)]);

  // Preserve the consumer's ref
  const ref = useMemo(
    () => mergeRefs([tooltipReference, menuReference]),
    [tooltipReference, menuReference]
  );

  const getProps = (userProps: any) =>
    getTooltipReferenceProps(getMenuReferenceProps({ ref, ...userProps }));

  const popoverState = menuOpen ? 'threadOpen' : tooltipOpen ? 'previewOpen' : 'closed';

  return {
    getProps,
    menuContext,
    tooltipContext,
    getMenuFloatingProps,
    getTooltipFloatingProps,
    setMenuOpen,
    threadId,
    hasThread,
    threadInfo,
    getNewThreadId,

    popoverState,
  };
}

export const PopoverTrigger = ({ children, context }: Props) => {
  const {
    getProps,
    menuContext,
    tooltipContext,
    getMenuFloatingProps,
    getTooltipFloatingProps,
    setMenuOpen,
    threadId,
    threadInfo,
    getNewThreadId,
  } = context;
  const { theme } = useApp();
  return (
    <>
      {cloneElement(children, getProps(children.props))}
      <FloatingPortal>
        {menuContext.open && (
          <FloatingFocusManager context={menuContext}>
            <div
              ref={menuContext.floating}
              className={theme.className}
              style={{
                position: menuContext.strategy,
                top: menuContext.y ?? 0,
                left: menuContext.x ?? 0,
                outline: 'none',
              }}
              {...getMenuFloatingProps()}
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
        {!menuContext.open && tooltipContext.open && (
          <FloatingFocusManager context={tooltipContext}>
            <div
              ref={tooltipContext.floating}
              className={theme.className}
              style={{
                position: tooltipContext.strategy,
                top: tooltipContext.y ?? 0,
                left: tooltipContext.x ?? 0,
                outline: 'none',
              }}
              onClick={() => setMenuOpen(true)}
              {...getTooltipFloatingProps()}
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
