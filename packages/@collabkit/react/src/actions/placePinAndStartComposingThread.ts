import { BasicPinProps, Pin, Store } from '../constants';
import { getConfig } from './index';
import { subscribeThread } from './subscribeThread';

export async function placePinAndStartComposingThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    pin: BasicPinProps;
  }
) {
  const { userId } = getConfig(store);
  const { workspaceId, threadId } = props;
  subscribeThread(store, props);
  store.composingId = { type: 'thread', threadId, workspaceId };

  if (store.enableContinuousMode) {
    for (const threadId in store.workspaces[workspaceId].pins) {
      if (store.workspaces[workspaceId].pins[threadId].state === 'pending') {
        delete store.workspaces[workspaceId].pins[threadId];
      }
    }
  }

  if (props.pin) {
    const pin: Pin = {
      ...props.pin,
      createdAt: +new Date(),
      createdById: userId,
      state: 'pending',
    };

    store.workspaces[workspaceId].pins[threadId] = pin;

    store.viewingId = {
      type: 'pin',
      pinId: threadId,
      workspaceId,
    };
  }

  if (store.uiState === 'selecting') {
    if (!store.enableContinuousMode) {
      store.uiState = 'idle';
    }
  }
}
