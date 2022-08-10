import { getConfig } from './index';
import type { Store } from '../constants';

export async function subscribeSeen(store: Store) {
  const { appId, userId, workspaceId } = getConfig(store);
  if (!userId) {
    return;
  }

  const onSeenChange = (event: { threadId: string; seenUntilId: string }) => {
    store.workspaces[workspaceId].seen[event.threadId] = event.seenUntilId;
  };

  store.sync.subscribeSeen({ appId, userId, workspaceId, subs: store.subs }, onSeenChange);
}
