import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { focus } from '../../src/actions/focus';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { CommentTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';

test('focus', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  expect(store.editingId).toBe(null);
  const target: CommentTarget = {
    type: 'comment',
    threadId: nanoid(),
    workspaceId: nanoid(),
    eventId: nanoid(),
    treeId: nanoid(),
  };
  focus(store as Store, { target });
  expect(store.focusedId).toBe(target);
});
