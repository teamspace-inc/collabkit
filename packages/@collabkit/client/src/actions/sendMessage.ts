import type { Store } from '@collabkit/core';
import { actions } from '.';
import { extract } from '@collabkit/editor';
import { clearComposer } from './clearComposer';
import { clearComposerAttachments } from './clearAttachments';
import { createEvent } from './createEvent';

export async function sendMessage(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string }
) {
  const { userId } = store;
  const { workspaceId, threadId, eventId } = props;
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
  const composer = workspace.composers[threadId][eventId];
  const { editor } = composer;
  const { body, mentions } = editor ? extract(editor) : { body: '', mentions: [] };
  const { attachments } = composer;
  // we can move this check elsewhere
  if (`${body}`.trim().length === 0) {
    console.warn('[CollabKit] tried to send an empty message');
    // can't send empty messages
    return;
  }
  clearComposer(store, { workspaceId, threadId, eventId });
  const pendingThreadInfo = workspace.pendingThreadInfo[threadId];
  if (pendingThreadInfo) {
    await actions.saveThreadInfo(store, {
      workspaceId,
      threadId,
      isOpen: true,
      info: pendingThreadInfo,
    });
  }
  const isFirstEvent = Object.keys(workspace.timeline[threadId] ?? {}).length === 0;
  const event = await createEvent(store, {
    event: {
      type: 'message',
      body,
      createdAt: store.sync.serverTimestamp(),
      createdById: userId,
      mentions,
      attachments,
    },
    parentEvent: null,
    threadId,
  });
  clearComposerAttachments(store, { workspaceId, threadId, eventId });
  store.callbacks?.onCommentSend?.({ workspaceId, threadId, userId, event });
  if (isFirstEvent) {
    store.callbacks?.onThreadCreated?.({
      workspaceId,
      threadId,
      userId,
      event,
      info: workspace.threadInfo?.[threadId] || {},
    });
  }
}
