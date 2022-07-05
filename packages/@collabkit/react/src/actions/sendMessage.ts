import { Store } from '../constants';
import { $createTextNode, $getRoot } from 'lexical';
import { writeMessageToFirebase } from './writeMessageToFirebase';

export async function sendMessage(store: Store, workspaceId: string, threadId: string) {
  const { editor } = store.workspaces[workspaceId].composers[threadId];

  const body = editor.getEditorState().read(() => $getRoot().getTextContent(false));

  if (body.trim().length === 0) {
    console.warn('tried to send an empty message');
    // can't send empty messages
    return;
  }

  try {
    await writeMessageToFirebase(store, workspaceId, threadId, body, body);
  } catch (e) {
    console.error(' failed to send message ');
    return;
  }

  editor.update(() => $getRoot().getChildren()[0].replace($createTextNode('')));
}
