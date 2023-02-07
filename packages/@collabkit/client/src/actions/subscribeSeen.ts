import { getConfig } from './index';
import type { Store } from '@collabkit/core';

export async function subscribeSeen(store: Store) {
  const { appId, userId, workspaceId } = getConfig(store);
  if (!userId) {
    return;
  }

  console.log('subscribeSeen', workspaceId);

  const onSeenChange = (event: { threadId: string; seenUntilId: string }) => {
    console.log('subscribeSeen', workspaceId, event.threadId, event.seenUntilId);
    store.workspaces[workspaceId].seen[event.threadId] = event.seenUntilId;
  };

  store.sync.subscribeSeen({ appId, userId, workspaceId, subs: store.subs, onSeenChange });
}
