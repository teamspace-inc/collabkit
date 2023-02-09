import type { Store } from '@collabkit/core';

export function startEditing(
  store: Store,
  target: { eventId: string; workspaceId: string; threadId: string; treeId: string }
) {
  store.editingId = {
    type: 'comment',
    ...target,
  };
}
