import type { CommentCancelButtonTarget, Store } from '@collabkit/core';

export function stopEditing(store: Store, props?: { target?: CommentCancelButtonTarget }) {
  // rollback attachments to if editing was cancelled
  if (props?.target && props.target.type === 'commentCancelButton') {
    const { target } = props;
    const { workspaceId, threadId, eventId } = target;
    const snapshot = store.editingEventSnapshots[eventId];
    if (snapshot) {
      // required as the snapshot is readonly
      const attachments = structuredClone(snapshot.attachments ?? {});
      store.workspaces[workspaceId].composers[threadId][eventId].attachments = attachments;
      store.workspaces[workspaceId].timeline[threadId][eventId].attachments = attachments;
    }
  }
  store.editingId = null;
}
