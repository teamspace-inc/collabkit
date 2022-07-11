import { DB, Store } from '../constants';

import { ref, set, serverTimestamp } from 'firebase/database';
import { getConfig } from './index';
import { subscribeThread } from './subscribeThread';

export async function startThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    pin?: { selector: string; url: string; offset?: { x: number; y: number } };
  }
) {
  const { appId, userId } = getConfig(store);
  subscribeThread(store, props);

  if (props.pin) {
    const pinRef = ref(DB, `/pins/${appId}/${props.workspaceId}/${props.threadId}`);
    try {
      set(pinRef, {
        ...props.pin,
        state: 'open',
        createdAt: serverTimestamp(),
        createdById: userId,
      });
    } catch (e) {
      // todo handle this gracefully in the UI
      console.error('failed to set pin', e);
      return;
    }

    store.viewingId = {
      type: 'stickyThread',
      workspaceId: props.workspaceId,
      threadId: props.threadId,
      pin: props.pin,
    };
  }

  if (store.uiState === 'selecting') {
    store.uiState = 'idle';
  }
}
