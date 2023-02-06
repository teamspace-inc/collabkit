import { ObjectProps } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { useStore } from './useStore';

export function usePendingThreadId(props: ObjectProps & { workspaceId: string | null }) {
  const store = useStore();
  if (!props.workspaceId) {
    return '';
  }
  return (store.workspaces[props.workspaceId].pendingThreads[props.objectId] ||= nanoid());
}
