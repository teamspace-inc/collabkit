import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { startEditing } from '../../src/actions/startEditing';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { CommentTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';

test('startEditing', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  expect(store.editingId).toBe(null);
  const commentTarget: CommentTarget = {
    type: 'comment',
    threadId: nanoid(),
    workspaceId: nanoid(),
    eventId: nanoid(),
    treeId: nanoid(),
  };
  startEditing(store as Store, commentTarget);
  expect(store.editingId).toBe(commentTarget);
});
