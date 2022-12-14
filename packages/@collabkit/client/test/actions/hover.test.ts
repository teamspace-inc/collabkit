import { expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { hover } from '../../src/actions/hover';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { CommentTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';

test('hover', () => {
  const store = createStore();
  store.sync = new FirebaseSync({ test: true });
  expect(store.hoveringId).toBe(null);
  const target: CommentTarget = {
    type: 'comment',
    threadId: nanoid(),
    workspaceId: nanoid(),
    eventId: nanoid(),
    treeId: nanoid(),
  };
  hover(store as Store, { target });
  expect(store.hoveringId).toBe(target);
});