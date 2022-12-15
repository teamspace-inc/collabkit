import { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { useSnapshot } from 'valtio';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
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

  const threadVisible =
    viewingId?.type === 'thread' &&
    viewingId.threadId === threadId &&
    viewingId.workspaceId === workspaceId;

  const previewVisible =
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

  const onOpenChange = useCallbackRef((open: boolean) => {
    if (target) {
      events.onPopoverThreadOpenChange({ target, open });
    }
  });
  const onPreviewChange = useCallbackRef((open: boolean) => {
    if (target) {
      events.onPopoverPreviewChange({ target, open });
    }
  });
  const showThread = useCallbackRef(() => {
    if (target) {
      events.onPopoverThreadOpenChange({ target, open: true });
    }
  });
  const hideThread = useCallbackRef(() => {
    if (target) {
      events.onPopoverThreadOpenChange({ target, open: false });
    }
  });
  const showPreview = useCallbackRef(() => {
    if (target) {
      events.onPopoverPreviewChange({ target, open: true });
    }
  });
  const hidePreview = useCallbackRef(() => {
    if (target) {
      events.onPopoverPreviewChange({ target, open: false });
    }
  });

  return {
    threadId,
    hasThread,
    threadVisible,
    previewVisible,
    onOpenChange,
    onPreviewChange,
    showThread,
    hideThread,
    showPreview,
    hidePreview,
  };
}
