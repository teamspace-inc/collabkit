import type { Store } from '@collabkit/core';
import { $createTextNode, $getRoot } from 'lexical';
import { writeMessageToFirebase } from './writeMessageToFirebase';
import { getConfig } from '.';

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
  // console.log('sending message', workspaceId, threadId);

  const workspace = store.workspaces[workspaceId];
  const { editor, $$body: body } = workspace.composers[threadId];

  if (body.trim().length === 0) {
    console.warn('[CollabKit] tried to send an empty message');
    // can't send empty messages
    return;
  }

  editor?.update(() => {
    $getRoot().getChildren()[0].replace($createTextNode(''));
  });

  // a pending pin is marked as 'open' on first message send
  const hasPendingPin = workspace.pins[threadId]?.state === 'pending';

  try {
    await writeMessageToFirebase(store, {
      workspaceId,
      threadId,
      body,
      preview: body,
      type: 'message',
      ...(hasPendingPin
        ? {
            pin: { ...workspace.pins[threadId] },
          }
        : {}),
    });

    if (hasPendingPin) {
      workspace.pins[threadId].state = 'open';
    }

    const event = {
      workspaceId,
      threadId,
      body,
      createdById: userId,
      createdAt: +Date.now(),
      type: 'message',
    } as const;

    store.callbacks?.onCommentSend?.({ event });
  } catch (e) {
    console.error('[CollabKit]: failed to send message ', e);
    workspace.pins[threadId].state = 'pending';
    return;
  }
}
