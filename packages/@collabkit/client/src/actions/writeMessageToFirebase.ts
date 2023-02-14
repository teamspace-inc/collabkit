import type { Attachments, Event, Pin, Store, WithID } from '@collabkit/core';
import { closeEmojiReactionPicker } from './closeEmojiReactionPicker';
import { seen } from './seen';
import { stopTyping } from './stopTyping';

export async function writeMessageToFirebase(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    body: string;
    parentId?: string;
    type: 'message' | 'reaction' | 'edit';
    mentions?: string[];
    pin?: Pin | null;
  }
) {
  const { type, workspaceId, threadId, body, parentId, mentions, pin } = props;

  if (store.isReadOnly) {
    console.warn('CollabKit: cannot send message in read-only mode');
    return;
  }

  const userId = store.userId;
  const appId = store.config.appId;

  if (!appId) {
    console.warn('CollabKit: cannot send a message, no appId');
    return;
  }

  if (!userId) {
    console.warn('CollabKit: cannot send a message, no userId');
    return;
  }

  closeEmojiReactionPicker(store);

  const event: Event = {
    type,
    body,
    createdAt: store.sync.serverTimestamp(),
    createdById: userId,
    mentions,
  };

  if (parentId) {
    event.parentId = parentId;
  }

  try {
    const eventId = store.sync.nextEventId({ appId, workspaceId, threadId });
    const workspace = store.workspaces[workspaceId];
    workspace.seen[threadId] = eventId;
    workspace.timeline[threadId] ||= {};
    workspace.timeline[threadId][eventId] = {
      ...event,
      createdAt: +Date.now(),
      id: eventId,
    };

    try {
      await store.sync.sendMessage({
        appId,
        userId,
        workspaceId,
        threadId,
        body,
        event,
        eventId,
      });
    } catch (e) {
      // we don't need to revert seen as it works by comparing ids
      delete store.workspaces[workspaceId].timeline[threadId][eventId];
      return;
    }

    // stop typing indicator as we sent the message successfully
    try {
      const promises = [];
      // we only show the typing indicator for new messages
      // not for edits or reactions
      if (type === 'message') {
        promises.push(
          stopTyping(store, {
            target: { workspaceId, threadId, eventId: 'default' },
          })
        );
      }

      if (pin) {
      promises.push(
          // parent id is only set when we are editing a comment
          savePin(store, { pin: { ...pin, eventId: parentId ?? eventId }, appId, workspaceId })
        );
      }

      promises.push(
        actions.seen(store, {
          target: {
            workspaceId,
            threadId,
            eventId,
            type: 'comment',
            treeId: '',
          },
        })
      );

      await Promise.all(promises);
    } catch (e) {
      console.error('CollabKit: error stopping typing indicator', e);
    }

    const eventWithId: WithID<Event> = {
      id: eventId,
      ...event,
    };

    return eventWithId;
  } catch (e) {
    console.error(e);
    // todo: handle failure here
  }
}
