import { Store } from '../constants';
import { $createTextNode, $getRoot } from 'lexical';
import { writeMessageToFirebase } from './writeMessageToFirebase';

export async function sendMessage(store: Store, workspaceId: string, threadId: string) {
  console.log('sending message', workspaceId, threadId);
  const { editor, $$body: body } = store.workspaces[workspaceId].composers[threadId];

  if (body.trim().length === 0) {
    console.warn('tried to send an empty message');
    // can't send empty messages
    return;
  }

  editor.update(() => $getRoot().getChildren()[0].replace($createTextNode('')));

  try {
    await writeMessageToFirebase(store, workspaceId, threadId, body, body);
  } catch (e) {
    console.error(' failed to send message ');
    return;
  }
}
