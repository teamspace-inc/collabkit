import type { Store, ThreadTarget } from '@collabkit/core';

export function closePreview(store: Store, props: { target: ThreadTarget }) {
  if (
    store.previewingId?.type === 'thread' &&
    store.previewingId.threadId === props.target.threadId
  ) {
    console.log('closePreview', props.target);
    store.previewingId = null;
  }
}
