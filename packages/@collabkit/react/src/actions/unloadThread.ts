import { getConfig } from '.';
import { Store } from '../constants';
import { timelineRef } from '../sync/firebase/refs';

export function unloadThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const { appId } = getConfig(store);
  store.subs[timelineRef(appId, props.workspaceId, props.threadId).toString()]?.();
}
