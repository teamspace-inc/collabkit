import { LexicalEditor, $getRoot } from 'lexical';
import { $isMentionNode, TRANSFORMERS } from '.';
import { $convertToMarkdownString } from '@lexical/markdown';

export function parse(editor: LexicalEditor) {
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
