import { useCallback, useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { ObjectProps, ThreadTarget } from '@collabkit/core';
import { useExistingThreadId } from './useExistingThreadId';
import { usePendingThreadId } from './usePendingThreadId';
import { useSaveThreadInfo } from './useSaveThreadInfo';

export type PopoverState = 'open' | 'preview' | 'closed';

export function usePopoverThread(props: ObjectProps) {
  const { store, events } = useApp();
  const { objectId, objectName } = props;
  const { workspaceId, viewingId, previewingId } = useSnapshot(store);

  const existingThreadId = useExistingThreadId({ objectId });
  const hasThread = !!existingThreadId;
  const newThreadId = usePendingThreadId({ objectId, workspaceId });
  const threadId = existingThreadId ?? newThreadId;

  useSaveThreadInfo({
    workspaceId,
    threadId,
    info: { name: objectName, meta: { cellId: objectId } },
  });

  const open =
    viewingId?.type === 'thread' &&
    viewingId.threadId === threadId &&
    viewingId.workspaceId === workspaceId;

  const preview =
    previewingId?.type === 'thread' &&
    previewingId.threadId === threadId &&
    previewingId.workspaceId === workspaceId;

  const target = useMemo<ThreadTarget | null>(() => {
    return workspaceId
      ? {
          type: 'thread',
          threadId,
          workspaceId,
        }
      : null;
  }, [workspaceId, threadId]);

  const onOpenChange = useCallback(
    (open: boolean) => target && events.onPopoverThreadOpenChange({ target, open }),
    [events, target]
  );

  const onPreviewChange = useCallback(
    (open: boolean) => target && events.onPopoverPreviewChange({ target, open }),
    [events, target]
  );

  // onOpenChange and onPreviewChange return void | null
  // lets make sure they return void so we can use them
  // in useEffect inline;
  const openPopover = useCallback(() => {
    onOpenChange(true);
  }, [onOpenChange]);
  const hidePopover = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);
  const showPreview = useCallback(() => {
    onPreviewChange(true);
  }, [onPreviewChange]);
  const hidePreview = useCallback(() => {
    onPreviewChange(false);
  }, [onPreviewChange]);

  return {
    threadId,
    hasThread,
    open,
    preview,
    onOpenChange,
    onPreviewChange,
    openPopover,
    hidePopover,
    showPreview,
    hidePreview,
  };
}
