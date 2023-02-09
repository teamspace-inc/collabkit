import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { ObjectProps, ThreadTarget } from '@collabkit/core';
import { useExistingThreadId } from './useExistingThreadId';
import { usePendingThreadId } from './usePendingThreadId';
import { useSaveThreadInfo } from './useSaveThreadInfo';
import { usePopover } from './usePopover';
import { useStore } from './useStore';

export type PopoverState = 'open' | 'preview' | 'closed';

export function usePopoverThread(props: ObjectProps) {
  const store = useStore();
  const { objectId, objectName, objectUrl } = props;
  const { workspaceId, viewingId, previewingId } = useSnapshot(store);

  const existingThreadId = useExistingThreadId({ objectId });
  const hasThread = !!existingThreadId;
  const newThreadId = usePendingThreadId({ objectId, workspaceId });
  const threadId = existingThreadId ?? newThreadId;

  useSaveThreadInfo({
    workspaceId,
    threadId,
    info: {
      name: objectName,
      meta: { cellId: objectId },
      url: objectUrl,
    },
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

  const { onContentChange, onPreviewChange, showContent, hideContent, showPreview, hidePreview } =
    usePopover({ target });

  return {
    threadId,
    hasThread,
    threadVisible,
    previewVisible,
    onOpenChange: onContentChange,
    onPreviewChange,
    showThread: showContent,
    hideThread: hideContent,
    showPreview,
    hidePreview,
  };
}
