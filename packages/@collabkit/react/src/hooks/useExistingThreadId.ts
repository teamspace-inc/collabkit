import { ThreadLocator } from '@collabkit/core';
import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from './useApp';

export function useExistingThreadId(props: ThreadLocator) {
  const { objectId } = props;
  const { store } = useApp();
  const { workspaceId, workspaces } = useSnapshot(store);
  const openThreads = workspaceId ? workspaces[workspaceId]?.openThreads : {};

  const threadId = useMemo(() => {
    return Object.entries(openThreads).find(
      // todo rename cellId to objectId
      ([, { meta }]) => {
        console.log(meta.cellId === objectId, meta.cellId, objectId);
        return meta.cellId === objectId;
      }
    )?.[0];
  }, [objectId, openThreads]);

  return threadId;
}
