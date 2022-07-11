import { Store } from '../constants';
import { $createTextNode, $getRoot } from 'lexical';
import { writeMessageToFirebase } from './writeMessageToFirebase';

export async function sendMessage(store: Store, props: { workspaceId: string; threadId: string }) {
  const { workspaceId, threadId } = props;
  console.log('sending message', workspaceId, threadId);
  const workspace = store.workspaces[workspaceId];
  const { editor, $$body: body } = workspace.composers[threadId];

  if (body.trim().length === 0) {
    console.warn('tried to send an empty message');
    // can't send empty messages
    return;
  }

  editor.update(() => $getRoot().getChildren()[0].replace($createTextNode('')));

  try {
    await writeMessageToFirebase(store, {
      workspaceId,
      threadId,
      body,
      preview: body,
      type: 'message',
      ...(workspace.pins[threadId].state === 'pending'
        ? {
            pin: { ...workspace.pins[threadId] },
          }
        : {}),
    });
  } catch (e) {
    console.error(' failed to send message ', e);
    return;
  }
}
