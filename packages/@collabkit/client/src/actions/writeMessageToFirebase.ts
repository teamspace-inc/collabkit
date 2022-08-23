import type { Event, Pin, Store } from '@collabkit/core';
import { actions } from './';

export async function writeMessageToFirebase(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    body: string;
    preview: string;
    parentId?: string;
    type: 'message' | 'reaction';
    pin?: Pin;
  }
) {
  const { type, workspaceId, threadId, body, preview, pin, parentId } = props;

  if (store.isReadOnly) {
    console.warn('CollabKit: cannot send message in read-only mode');
    return;
  }

  const userId = store.userId;
  const appId = store.config.appId;

  if (!appId || !userId) {
    return;
  }

  // close emoji picker on send
  store.reactingId = null;

  const event: Event = {
    type,
    body,
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
  };

  if (parentId) {
    event.parentId = parentId;
  }

  try {
    const { id } = await store.sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      preview,
      pin,
      event,
    });

    store.workspaces[workspaceId].seen[threadId] = id;
    store.workspaces[workspaceId].timeline[threadId] ||= {};
    store.workspaces[workspaceId].timeline[threadId][id] = {
      ...event,
      createdAt: +Date.now(),
    };

    // stop typing indicator as we sent the message successfully
    Promise.all([
      actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } }),
      actions.seen(store, {
        workspaceId,
        threadId,
        eventId: id,
        type: 'comment',
      }),
    ]);
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}
