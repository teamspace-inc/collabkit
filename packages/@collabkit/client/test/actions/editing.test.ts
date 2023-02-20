import { expect, test } from 'vitest';
import { createStore, createWorkspace } from '../../src/store';
import { startEditing } from '../../src/actions/startEditing';
import { stopEditing } from '../../src/actions/stopEditing';
import { FirebaseSync } from '../../src/sync/firebase/FirebaseSync';
import { CommentTarget, Store } from '@collabkit/core';
import { nanoid } from 'nanoid';
import { initComposer } from '../../src/actions/initComposer';
import { proxy } from 'valtio';

test('startEditing', () => {
  const store = proxy(createStore());
  store.sync = new FirebaseSync({ test: true });
  expect(store.editingId).toBe(null);
  const workspaceId = nanoid();
  const threadId = nanoid();
  const eventId = nanoid();
  const userId = nanoid();
  store.userId = userId;
  store.workspaceId = workspaceId;
  store.workspaces[workspaceId] = createWorkspace();
  store.workspaces[workspaceId].timeline[threadId] = {};
  store.workspaces[workspaceId].timeline[threadId][eventId] = {
    id: eventId,
    type: 'message',
    body: 'Hello World',
    createdAt: new Date(),
    createdById: userId,
    mentions: [],
    attachments: {},
  };
  initComposer(store, {
    threadId,
    workspaceId,
    eventId,
  });
  const commentTarget: CommentTarget = {
    type: 'comment',
    threadId,
    workspaceId,
    eventId,
    treeId: nanoid(),
  };
  startEditing(store as Store, commentTarget);
  expect(store.editingId).toStrictEqual(commentTarget);
  stopEditing(store as Store);
  expect(store.editingId).toBeNull();
});
