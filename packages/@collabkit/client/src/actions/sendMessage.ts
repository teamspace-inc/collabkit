import type { Store } from '@collabkit/core';
import { $getRoot } from 'lexical';
import { writeMessageToFirebase } from './writeMessageToFirebase';
import { actions } from '.';
import { generateObjectIdFromCellId } from '../utils/generateObjectIdFromCellId';
import { $isMentionNode, TRANSFORMERS } from '@collabkit/editor';
import { $convertToMarkdownString } from '@lexical/markdown';
import { LexicalEditor } from 'lexical';

function readComposer(editor: LexicalEditor) {
  let mentions: string[] = [];
  let body = '';
  editor.getEditorState().read(() => {
    mentions = $getRoot()
      .getAllTextNodes()
      .filter((node) => $isMentionNode(node))
      .map((node) => node.__id)
      .filter((id) => typeof id === 'string');
    body = $convertToMarkdownString(TRANSFORMERS);
  });

  return { body, mentions };
}

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
  const { body, mentions } = editor ? readComposer(editor) : { body: '', mentions: [] };
  const { pendingPin } = composer;

  // we can move this check elsewhere
  if (`${body}`.trim().length === 0) {
    console.warn('[CollabKit] tried to send an empty message');
    // can't send empty messages
    return;
  }

  composer.editor?.update(() => {
    $getRoot().clear();
  });

  const pendingThreadInfo = workspace.pendingThreadInfo[threadId];

  if (pendingThreadInfo) {
    await actions.saveThreadInfo(store, {
      workspaceId,
      threadId,
      isOpen: true,
      info: pendingThreadInfo,
    });
  }

  const isFirstEvent = Object.keys(!workspace.timeline[threadId]).length === 0;

  try {
    const event = await writeMessageToFirebase(store, {
      workspaceId,
      threadId,
      body,
      preview: body,
      type: 'message',
      mentions,
      pin: pendingPin,
    });

    if (!event) {
      return;
    }

    composer.pendingPin = null;

    store.callbacks?.onCommentSend?.({ workspaceId, threadId, userId, event });
    if (isFirstEvent) {
      store.callbacks?.onThreadCreated?.({
        workspaceId,
        threadId,
        userId,
        event,
        info: generateObjectIdFromCellId(workspace.threadInfo[threadId]),
      });
    }
  } catch (e) {
    console.error('[CollabKit]: failed to send message ', e);
    return;
  }
}
