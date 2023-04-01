import { EditorContextType } from 'hooks/useEditorContext';
import { TextCardTarget } from 'state/constants';

export function getEditorViewKey(editorContext: EditorContextType, target: TextCardTarget) {
  if (!editorContext.target) {
    throw new Error('blank EditorContext target');
  }

  return `${editorContext.target.id}-${target.id}`;
}
