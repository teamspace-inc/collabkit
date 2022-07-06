import { Store } from '../constants';
import { timelineRef } from './index';

export function unloadThread(store: Store, props: { workspaceId: string; threadId: string }) {
  store.subs[timelineRef(store, props.workspaceId, props.threadId).toString()]?.();
}
