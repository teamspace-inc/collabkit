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
    console.log('subscribeOpenThreads.onChange', { threadId, info });
    if (info) {
      store.workspaces[workspaceId].openThreads[threadId] = info;
    } else {
      delete store.workspaces[workspaceId].openThreads[threadId];
    }
  };
  store.sync.subscribeOpenThreads({ appId, workspaceId, subs: store.subs }, onChange);
}
