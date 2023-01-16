import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { EditorState, LexicalEditor } from 'lexical';
import { useEffect } from 'react';

export function EditorPlugin(props: {
  onMount: (editorState: EditorState, editor: LexicalEditor) => void;
}) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    props.onMount(editor.getEditorState(), editor);
  }, [editor]);
  return null;
}
