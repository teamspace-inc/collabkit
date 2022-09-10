import type { CommentTarget, Store } from '@collabkit/core';

export function startEditing(store: Store, target: CommentTarget) {
  store.editingId = target;
}
