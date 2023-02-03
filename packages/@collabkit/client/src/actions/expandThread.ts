import { Store } from '@collabkit/core';

export function expandThread(store: Store, props: { threadId: string }) {
  const isExpanded = !!store.expandedThreadIds.find((id) => id === props.threadId);
  if (!isExpanded) {
    store.expandedThreadIds.push(props.threadId);
  }
}
