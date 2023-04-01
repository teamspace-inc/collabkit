// automatically focuses the editor
// if it is editable and is set to isEditing

// import { TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useEffect, useRef } from 'react';

type UseAutofocusProps = {
  view: EditorView | null;
  isEditable: boolean;
  isEditing: boolean;
};

export function useAutofocus({ view, isEditing, isEditable }: UseAutofocusProps) {
  const wasEditing = useRef(isEditing);

  useEffect(() => {
    if (view && isEditable !== view.props.editable!(view.props.state)) {
      view.setProps({
        editable: () => isEditable,
      });
    }

    if (isEditable && isEditing && view && !wasEditing.current) {
      view.focus();
    }

    wasEditing.current = isEditing;
  }, [isEditable, isEditing]);
}
