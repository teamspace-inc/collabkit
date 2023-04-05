import type { Store } from '@collabkit/core';
import * as actions from '.';
import { extract } from '@collabkit/editor';
import { clearComposer } from './clearComposer';
import { clearAttachments } from './clearAttachments';
import { createEvent } from './createEvent';
import { sendBotCommand } from '../utils/sendBotCommand';

export async function sendMessage(
  store: Store,
  props: { workspaceId: string; threadId: string; eventId: string; bot?: boolean }
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
  sendBotCommand({
    command: body,
    workspaceId: workspaceId,
    threadId: threadId,
    appId: store.config.appId,
  });
  clearComposer(store, { workspaceId, threadId, eventId });
  const pendingThreadInfo = workspace.pendingThreadInfo[threadId];
  if (pendingThreadInfo) {
    await actions.saveThreadInfo(store, {
      workspaceId,
      threadId,
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
  clearAttachments(store, { workspaceId, threadId, eventId });
  store.callbacks?.onCommentSend?.({ workspaceId, threadId, userId, event });
  if (isFirstEvent) {
    store.callbacks?.onThreadCreated?.({
      workspaceId,
      threadId,
      userId,
      event,
    });
  }
}
