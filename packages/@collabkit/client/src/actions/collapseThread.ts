import { Store } from '@collabkit/core';

export function collapseThread(store: Store, props: { threadId: string }) {
  const index = store.expandedThreadIds.findIndex((id) => id === props.threadId);
  if (index > -1) {
    store.expandedThreadIds.slice(index, 1);
  }
}
