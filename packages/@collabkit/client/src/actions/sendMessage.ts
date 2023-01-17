import type { Store } from '@collabkit/core';
import { $getRoot } from 'lexical';
import { writeMessageToFirebase } from './writeMessageToFirebase';
import { actions, getConfig } from '.';
import { generateObjectIdFromCellId } from '../utils/generateObjectIdFromCellId';

export async function sendMessage(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { workspaceId, threadId, eventId } = props;
  const { userId } = getConfig(store);
  if (!userId) {
    console.warn('[CollabKit]: cannot send a message, anonymous user');
    if (store.config.onAuthenticationRequired) {
      store.config.onAuthenticationRequired();
    }
    return;
  }

  if (store.isReadOnly) {
    console.warn('[CollabKit]: cannot send message in read-only mode');
    return;
  }

  const workspace = store.workspaces[workspaceId];
  const { editor, $$body: body, mentions } = workspace.composers[threadId][eventId];

  if (`${body}`.trim().length === 0) {
    console.warn('[CollabKit] tried to send an empty message');
    // can't send empty messages
    return;
  }

  editor?.update(() => {
    $getRoot().clear();
  });

  if (store.workspaces[workspaceId].pendingThreadInfo[threadId]) {
    await actions.saveThreadInfo(store, {
      workspaceId,
      threadId,
      isOpen: true,
      info: store.workspaces[workspaceId].pendingThreadInfo[threadId],
    });
  }

  const isFirstEvent = Object.keys(!store.workspaces[workspaceId].timeline[threadId]).length === 0;

  try {
    const event = await writeMessageToFirebase(store, {
      workspaceId,
      threadId,
      body,
      preview: body,
      type: 'message',
      mentions,
    });

    if (!event) {
      return;
    }

    store.callbacks?.onCommentSend?.({ workspaceId, threadId, userId, event });
    if (isFirstEvent) {
      store.callbacks?.onThreadCreated?.({
        workspaceId,
        threadId,
        userId,
        event,
        info: generateObjectIdFromCellId(store.workspaces[workspaceId].threadInfo[threadId]),
      });
    }
  } catch (e) {
    console.error('[CollabKit]: failed to send message ', e);
    return;
  }
}
