import { ObjectProps } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useStore } from './useStore';

export function useExistingThreadId(props: ObjectProps) {
  const { objectId } = props;
  const store = useStore();
  const { workspaces, workspaceId } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const objects = workspace ? workspace.objects : null;
  // we assume the first threadId is the most recent
  return objects ? objects[objectId]?.[0] : null;
}
