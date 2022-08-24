import type { BasicPinProps, Pin, Store } from '@collabkit/core';
import { actions, getConfig } from './index';
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
  if (!userId) {
    console.warn('CollabKit: cannot place a pin, anonymous user');
    return;
  }
  const { workspaceId, threadId } = props;
  subscribeThread(store, props);
  store.composingId = { type: 'thread', threadId, workspaceId };

  if (store.uiState === 'continuous') {
    actions.removePendingPins(store);
  }

  if (props.pin) {
    const pin: Pin = {
      ...props.pin,
      createdAt: +new Date(),
      createdById: userId,
      state: 'new',
    };

    store.workspaces[workspaceId].pins[threadId] = pin;

    store.viewingId = {
      type: 'pin',
      pinId: threadId,
      workspaceId,
    };

    setTimeout(() => {
      store.workspaces[workspaceId].pins[threadId].state = 'pending';
    }, 16);
  }

  if (store.uiState === 'selecting') {
    store.uiState = 'idle';
  }
}
