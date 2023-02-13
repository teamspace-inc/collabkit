import type { Store, Sync, ThreadMeta } from '@collabkit/core';
import { getConfig } from './getConfig';

export function subscribeOpenThreads(store: Store) {
  const { appId, workspaceId } = getConfig(store);
  const onThreadChange: Sync.OpenThreadEventHandler = ({
    threadId,
    info,
  }: {
    threadId: string;
    info: { meta: ThreadMeta } | null;
  }) => {
    if (info) {
      store.workspaces[workspaceId].openThreads[threadId] = info;
    } else {
      delete store.workspaces[workspaceId].openThreads[threadId];
    }
  };
  store.sync.subscribeOpenThreads({ appId, workspaceId, subs: store.subs, onThreadChange });
}
