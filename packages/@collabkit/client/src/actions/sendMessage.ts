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
  const { editor, $$body: body } = workspace.composers[threadId];

  let mentions: string[] = [];

  editor?.getEditorState().read(() => {
    const nodes = $getRoot().getAllTextNodes();
    nodes.forEach((node) => {
      switch (node.__type) {
        case 'mention':
          const id = node.__id;
          if (typeof id === 'string') {
            mentions.push(node.__id);
          } else {
            console.debug('unexpected mention id', id);
          }
          break;
      }
    });
  });

  // console.debug('[CollabKit]: sending message', workspaceId, threadId, body, mentions);

  if (`${body}`.trim().length === 0) {
    console.warn('[CollabKit] tried to send an empty message');
    // can't send empty messages
    return;
  }

  editor?.update(() => {
    $getRoot().getChildren()[0].replace($createTextNode(''));
  });

  // a pending pin is marked as 'open' on first message send
  const hasPendingPin = workspace.pins[threadId]?.state === 'pending';

  // is first message in thread
  const isFirstMessage = Object.keys(workspace.timeline[threadId] ?? {}).length === 0;

  if (isFirstMessage && store.workspaces[workspaceId].clientThreadInfo[threadId]) {
    console.log('saving thread info');
    // save thread info
    await actions.saveThreadInfo(store, {
      workspaceId,
      threadId,
      isOpen: true,
      info: store.workspaces[workspaceId].clientThreadInfo[threadId],
    });
  }

  try {
    const event = await writeMessageToFirebase(store, {
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
      mentions,
    });

    if (!event) {
      return;
    }

    console.log(
      'isFirstMessage',
      isFirstMessage,
      store.workspaces[workspaceId].clientThreadInfo[threadId]
    );

    if (hasPendingPin) {
      workspace.pins[threadId].state = 'open';
    }

    store.callbacks?.onCommentSend?.({ workspaceId, threadId, userId, event });
  } catch (e) {
    console.error('[CollabKit]: failed to send message ', e);
    workspace.pins[threadId].state = 'pending';
    return;
  }
}
