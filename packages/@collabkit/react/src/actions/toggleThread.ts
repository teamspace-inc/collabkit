import { Store } from '../constants';
import { loadThread } from './loadThread';
import { initThread } from './initThread';
import { unloadThread } from './unloadThread';
import { positionThread } from './positionThread';

export function toggleThread(
  store: Store,
  props: { workspaceId: string; threadId: string; point?: { x: number; y: number } }
) {
  console.log('toggling thread', props.point);
  store.openId && unloadThread(store, store.openId);
  initThread(store, props);
  loadThread(store, props);
  if (props.point) {
    positionThread(store, { point: props.point });
    store.openId = { type: 'thread', workspaceId: props.workspaceId, threadId: props.threadId };
    store.uiState = 'commenting';
  }
}
