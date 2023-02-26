import { describe, expect, test } from 'vitest';
import { createStore } from '../../src/store';
import { blur } from '../../src/actions/blur';
import { focus } from '../../src/actions/focus';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { CommentTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';

describe('focus & blur', async () => {
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

  test('focus', () => {
    focus(store as Store, { target });
    expect(store.focusedId).toBe(target);
  });

  test('blur', () => {
    blur(store as Store, { target });
    expect(store.focusedId).toBe(null);
  });

  test('focus', () => {
    focus(store as Store, { target });
    expect(store.focusedId).toBe(target);
  });

  test('blur different target', () => {
    blur(store as Store, { target: { ...target, type: 'thread' } });
    expect(store.focusedId).toBe(target);
  });
});
