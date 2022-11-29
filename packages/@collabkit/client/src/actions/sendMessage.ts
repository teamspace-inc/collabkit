import type { Store } from '@collabkit/core';
import { $createTextNode, $getRoot } from 'lexical';
import { writeMessageToFirebase } from './writeMessageToFirebase';
import { actions, getConfig } from '.';

export async function sendMessage(store: Store, props: { workspaceId: string; threadId: string }) {
  const { workspaceId, threadId } = props;
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
  const { editor, $$body: body, mentions } = workspace.composers[threadId];

  if (`${body}`.trim().length === 0) {
    console.warn('[CollabKit] tried to send an empty message');
    // can't send empty messages
    return;
  }

  editor?.update(() => {
    $getRoot().getChildren()[0].replace($createTextNode(''));
  });

  const isFirstMessage = Object.keys(workspace.timeline[threadId] ?? {}).length === 0;

  if (isFirstMessage && store.workspaces[workspaceId].pendingThreadInfo[threadId]) {
    console.log('saving thread info');
    // save thread info
    await actions.saveThreadInfo(store, {
      workspaceId,
      threadId,
      isOpen: true,
      info: store.workspaces[workspaceId].pendingThreadInfo[threadId],
    });
  }

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
  } catch (e) {
    console.error('[CollabKit]: failed to send message ', e);
    return;
  }
}
