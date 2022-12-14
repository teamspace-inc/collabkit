import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupFirebase } from '../setupFirebase';
import { createComposer, createStore, createWorkspace } from '../../src/store';
import { ComposerTarget, Store } from '@collabkit/core';
import { disableComposerCommentButton } from '../../src/actions/disableComposerCommentButton';
import { enableComposerCommentButton } from '../../src/actions/enableComposerCommentButton';

setupFirebase();

test('disableCommentComposerButton', async () => {
  const workspaceId = nanoid();
  const store = createStore();
  store.workspaces[workspaceId] = createWorkspace();
  const threadId = nanoid();
  store.workspaces[workspaceId].composers[threadId] = createComposer();
  const target: ComposerTarget = {
    type: 'composer',
    threadId,
    workspaceId,
    eventId: 'default',
  };
  expect(store.workspaces[workspaceId].composers[threadId].enabled).toStrictEqual({
    default: false,
  });
  await enableComposerCommentButton(store as Store, { target });
  expect(store.workspaces[workspaceId].composers[threadId].enabled).toStrictEqual({
    default: true,
  });
  await disableComposerCommentButton(store as Store, { target });
  expect(store.workspaces[workspaceId].composers[threadId].enabled).toStrictEqual({
    default: false,
  });
});