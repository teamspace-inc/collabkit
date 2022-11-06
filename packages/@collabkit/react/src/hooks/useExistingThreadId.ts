import { ThreadLocator } from '@collabkit/core';
import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function useExistingThreadId(props: ThreadLocator) {
  const { objectId } = props;
  const { store } = useApp();
  const { workspaces, workspaceId } = useSnapshot(store);
  const workspace = workspaceId ? workspaces[workspaceId] : null;
  const objects = workspace ? workspace.objects : null;
  // we assume the first threadId is the most recent
  return objects ? objects[objectId]?.[0] : null;
}

// export function useExistingThreadId({ objectId }: { objectId: string }) {
//   const { store } = useApp();
//   const { workspaceId, workspaces } = useSnapshot(store);
//   const openThreads = workspaceId ? workspaces[workspaceId]?.openThreads : {};

//   const threadId = Object.entries(openThreads).find(
//     ([, { meta }]) => meta.cellId === objectId
//   )?.[0];

//   return threadId ?? null;
// }
