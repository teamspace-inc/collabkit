import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { blur } from '../../src/actions/blur';
import { focus } from '../../src/actions/focus';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { CommentTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';

test('blur', () => {
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
  blur(store as Store);
  expect(store.focusedId).toBe(target);
});