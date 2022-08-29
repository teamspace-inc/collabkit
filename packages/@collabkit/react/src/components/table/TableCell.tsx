// import React, { ReactNode, useState, useCallback, useRef } from 'react';
import React from 'react';
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
import { useSnapshot } from 'valtio';
import { actions } from '@collabkit/client';
import type { ThreadTarget } from '@collabkit/core';
import { tableCellStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import { PopoverThread } from '../PopoverThread';
import { useApp } from '../../hooks/useApp';
import { useIsResolved, useThread, useThreadStatus } from '../../hooks/useThread';

const Wrapper = styled('div', tableCellStyles.wrapper);
const Indicator = styled('span', tableCellStyles.indicator);

interface Props {
  children: JSX.Element;
  cellId: string;
}

export const TableCell = ({ children, cellId }: Props) => {
  const { store, theme } = useApp();
  const { viewingId, workspaceId } = useSnapshot(store);

  // TODO: find open thread
  const threadId = cellId;
  const { isResolved, isEmpty } = useThreadStatus({ store, threadId, workspaceId });

  const open = viewingId?.type === 'thread' && viewingId.threadId === threadId;
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: (open) => {
      console.log('onOpenChange', {
        threadId,
        workspaceId,
        open,
      });
      if (threadId && workspaceId) {
        const target: ThreadTarget = {
          type: 'thread',
          threadId,
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
      {threadId && !isEmpty && !isResolved ? <Indicator /> : null}
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
                threadId={threadId}
                style={{ minWidth: 250, border: '1px solid #ccc' }}
              />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  );
};
