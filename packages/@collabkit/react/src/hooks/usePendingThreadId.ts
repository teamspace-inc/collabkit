import { ObjectProps } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { useApp } from './useApp';

export function usePendingThreadId(props: ObjectProps & { workspaceId: string | null }) {
  const { store } = useApp();
  if (!props.workspaceId) {
    return '';
  }
  return (store.workspaces[props.workspaceId].pendingThreads[props.objectId] ||= nanoid());
}
