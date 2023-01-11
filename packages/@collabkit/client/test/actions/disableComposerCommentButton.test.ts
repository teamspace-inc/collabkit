import { expect, test } from 'vitest';
import { nanoid } from 'nanoid';
import { setupFirebase } from '../../../test-utils/src';
import { createComposer, createStore, createWorkspace } from '../../src/store';
import { ComposerTarget, Store } from '@collabkit/core';
import { disableComposerCommentButton } from '../../src/actions/disableComposerCommentButton';
import { initComposer } from '../../src/actions/initComposer';
import { enableComposerCommentButton } from '../../src/actions/enableComposerCommentButton';

setupFirebase();

test('disableCommentComposerButton', async () => {
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
