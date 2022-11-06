import { ObjectProps } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function useExistingThreadId(props: ObjectProps) {
  const { objectId } = props;
  const { store } = useApp();
  const { workspaces, workspaceId } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const objects = workspace ? workspace.objects : null;
  // we assume the first threadId is the most recent
  return objects ? objects[objectId]?.[0] : null;
}
