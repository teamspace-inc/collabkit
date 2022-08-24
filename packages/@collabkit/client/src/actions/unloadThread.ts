import { getConfig } from '.';
import type { Store } from '@collabkit/core';
import { timelineRef } from '../sync/firebase/refs';

export function unloadThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const { appId } = getConfig(store);
  store.subs[timelineRef(appId, props.workspaceId, props.threadId).toString()]?.();
}
