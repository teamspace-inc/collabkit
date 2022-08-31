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
} from '@floating-ui/react-dom-interactions';
import { nanoid } from 'nanoid';
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import type { Target, ThreadTarget, Workspace } from '@collabkit/core';
import { tableCellStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import { PopoverThread } from '../PopoverThread';
import { useApp } from '../../hooks/useApp';

const Wrapper = styled('div', tableCellStyles.wrapper);
const Indicator = styled('span', tableCellStyles.indicator);

interface Props {
  children: JSX.Element;
  name?: string;
  viewId: string;
  cellId: string;
}

export const TableCell = ({ children, name, viewId, cellId }: Props) => {
  const { store, theme } = useApp();
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
  const { x, y, reference, floating, strategy, context } = useFloating({
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
    middleware: [],
    placement: 'right-start',
    whileElementsMounted: autoUpdate,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  return (
    <>
      <Wrapper {...getReferenceProps({ ref: reference })}>{children}</Wrapper>
      {threadId ? <Indicator /> : null}
      <FloatingPortal>
        {open && (
          <FloatingFocusManager context={context}>
            <div
              ref={floating}
              className={theme.className.toString()}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
              }}
              aria-labelledby={labelId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
            >
              <PopoverThread
                threadId={threadId ?? newThreadId.current!}
                info={{
                  name,
                  meta: {
                    viewId,
                    cellId,
                  },
                }}
                style={{ minWidth: 250, border: '1px solid #ccc' }}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};

function isThreadWithId(target: Target | null, id: string): target is ThreadTarget {
  return target != null && target.type === 'thread' && target.threadId === id;
}
