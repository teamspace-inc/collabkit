import type { State } from 'state/constants';
import { setBlockType as _setBlockType } from 'prosemirror-commands';
import { schemas } from 'editor';
import { EditorState, Transaction } from 'prosemirror-state';
import { Block } from 'types';
import { wrapInList } from 'prosemirror-schema-list';
import { clearNodes } from './clearNodes';
import { getEditorViewKey } from 'state/helpers';
import { EditorContextType } from 'hooks/useEditorContext';

export type PredicateCommand = (
  state: EditorState,
  dispatch?: (tr: Transaction) => void
) => boolean;

const ol = schemas.markdown.nodes.ordered_list;
const ul = schemas.markdown.nodes.bullet_list;
const p = schemas.markdown.nodes.paragraph;
// const li = schemas.markdown.nodes.list_item;
const h = schemas.markdown.nodes.heading;

export const setBlockType = (
  state: State,
  info: { block: Block; editorContext: EditorContextType }
) => {
  const { editingId, editors } = state.store.editing;

  if (!editingId) {
    console.warn('[setBlockType] blank pageState.editingId');
    return;
  }

  if (editingId.type !== 'card') {
    return;
  }

  const key = getEditorViewKey(info.editorContext, editingId);

  const view = editors[key];

  if (!view) {
    console.warn('[setBlockType] blank view', editingId);
    return;
  }

  let action;
  switch (info.block) {
    case 'h1':
      action = _setBlockType(h, { level: 1 });
      break;
    case 'h2':
      action = _setBlockType(h, { level: 2 });
      break;
    case 'h3':
      action = _setBlockType(h, { level: 3 });
      break;
    case 'p':
      action = _setBlockType(p);
      break;
    case 'ol':
      action = wrapInList(ol, {});
      break;
    case 'ul':
      action = wrapInList(ul, {});
      break;
  }

  if (action && clearNodes()(view.state, view.dispatch)) {
    action(view.state, view.dispatch);
  }
};
