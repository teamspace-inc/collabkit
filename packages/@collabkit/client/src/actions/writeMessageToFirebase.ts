import type { Event, MentionWithColor, Pin, Store, WithID } from '@collabkit/core';
import { actions } from './';

export async function writeMessageToFirebase(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    body: string;
    preview: string;
    parentId?: string;
    type: 'message' | 'reaction' | 'edit';
    pin?: Pin;
    mentions?: MentionWithColor[];
  }
) {
  const { type, workspaceId, threadId, body, preview, pin, parentId, mentions } = props;

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

  const mentionsMap: { [userId: string]: boolean } = {};
  for (const mention of mentions || []) {
    mentionsMap[mention.id] = true;
  }

  const event: Event = {
    type,
    body,
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
    mentions: mentionsMap,
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
      hasProfile: true,
      createdAt: +Date.now(),
      id,
    };

    // stop typing indicator as we sent the message successfully
    try {
      await Promise.all([
        actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } }),
        actions.seen(store, {
          workspaceId,
          threadId,
          eventId: id,
          type: 'comment',
          treeId: '',
        }),
      ]);
    } catch (e) {
      console.error('CollabKit: error stopping typing indicator', e);
    }

    const eventWithId: WithID<Event> = {
      id,
      ...event,
    };

    return eventWithId;
  } catch (e) {
    console.error(e);
    // todo: handle failure here
  }
}
