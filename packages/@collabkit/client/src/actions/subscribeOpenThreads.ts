import type { Store, Sync, ThreadMeta } from '@collabkit/core';
import { getConfig } from './index';

export function subscribeOpenThreads(store: Store) {
  const { appId, workspaceId } = getConfig(store);
  const onChange: Sync.OpenThreadEventHandler = ({
    threadId,
    info,
  }: {
    threadId: string;
    info: { meta: ThreadMeta } | null;
  }) => {
    if (info) {
      store.workspaces[workspaceId].openThreads[threadId] = info;
      if (info.meta.cellId) {
        console.log('subscribeOpenThreads', info.meta);
        store.workspaces[workspaceId].objects[info.meta.cellId] ||= [threadId];
      }
    } else {
      delete store.workspaces[workspaceId].openThreads[threadId];
      const objectIds = Object.keys(store.workspaces[workspaceId].objects ?? {});
      for (const objectId of objectIds) {
        const threads = store.workspaces[workspaceId].objects[objectId];
        const index = threads.indexOf(threadId);
        if (index > -1) {
          threads.splice(index, 1);
        }
      }
    }
  };
  store.sync.subscribeOpenThreads({ appId, workspaceId, subs: store.subs }, onChange);
}
