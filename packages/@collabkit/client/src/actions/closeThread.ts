import type { Store, ThreadTarget } from '@collabkit/core';

export function closeThread(store: Store, props: { target: ThreadTarget }) {
  if (store.viewingId?.type === 'thread' && store.viewingId.threadId === props.target.threadId) {
    store.viewingId = null;
  }
}
