import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupFirebase } from '../../../test-utils/src';
import { createStore, createWorkspace } from '../../src/store';
import { ComposerTarget, Store } from '@collabkit/core';
import { disableComposerCommentButton } from '../../src/actions/disableComposerCommentButton';
import { enableComposerCommentButton } from '../../src/actions/enableComposerCommentButton';
import { initComposer } from '../../src/actions/initComposer';

setupFirebase();

test('enableComposerCommentButton', async () => {
  const workspaceId = nanoid();
  const store = createStore();
  store.workspaces[workspaceId] = createWorkspace();
  const threadId = nanoid();
  initComposer(store, { workspaceId, threadId, eventId: 'default' });
  const target: ComposerTarget = {
    type: 'composer',
    threadId,
    workspaceId,
    eventId: 'default',
  };
  expect(store.workspaces[workspaceId].composers[threadId].default.enabled).toBe(false);
  await enableComposerCommentButton(store as Store, { target });
  expect(store.workspaces[workspaceId].composers[threadId].default.enabled).toBe(true);
  await disableComposerCommentButton(store as Store, { target });
  expect(store.workspaces[workspaceId].composers[threadId].default.enabled).toBe(false);
});
