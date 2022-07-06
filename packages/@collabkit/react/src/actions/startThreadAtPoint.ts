import { Store } from '../constants';
import { nanoid } from 'nanoid';
import { getConfig, actions } from './index';

export async function startThreadAtPoint(store: Store, point: { x: number; y: number }) {
  store.point = point;
  const { workspaceId } = getConfig(store);
  const threadId = nanoid();
  actions.toggleThread(store, { workspaceId, threadId, point });
}
