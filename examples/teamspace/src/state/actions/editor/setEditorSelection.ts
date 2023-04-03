import { Selection } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import type { State, TextCardTarget } from 'state/constants';
import { Block, Mark } from 'types';
import { schemas } from 'editor';
import { EditorContextType } from 'hooks/useEditorContext';
import { getEditorViewKey } from 'state/helpers';

const ol = schemas.markdown.nodes.ordered_list;
const ul = schemas.markdown.nodes.bullet_list;
const p = schemas.markdown.nodes.paragraph;
const li = schemas.markdown.nodes.list_item;
const h = schemas.markdown.nodes.heading;

const em = schemas.markdown.marks.em;
const strong = schemas.markdown.marks.strong;

export const setEditorSelection = (
  state: State,
  info: { target: TextCardTarget; selection: Selection; editorContext: EditorContextType }
) => {
  const { editing: editing } = state.store;
  const { target, selection } = info;

  const { editingId } = editing;

  if (!editingId) {
    editing.formatting = null;
    return;
  }

  const key = getEditorViewKey(info.editorContext, target);

  const view = editing.editors[key];

  if (!view) {
    return;
  }

  const blocks = new Set<Block>([]);
  const marks = new Set<Mark>([]);

  const range = selection.$anchor.blockRange();

  function parseNode(node: Node) {
    node.marks.forEach((mark) => {
      if (mark.type === strong) {
        marks.add('strong');
      } else if (mark.type === em) {
        marks.add('em');
      }
    });

    if (node.isBlock) {
      if (node.type === h) {
        switch (node.attrs.level) {
          case 1:
            blocks.add('h1');
            break;
          case 2:
            blocks.add('h2');
            break;
          case 3:
            blocks.add('h3');
            break;
        }
      } else if (node.type === p) {
        blocks.add('p');
      } else if (node.type === ol) {
        blocks.add('ol');
      } else if (node.type === ul) {
        blocks.add('ul');
      } else if (node.type === li) {
        blocks.add('li');
      }
    }
  }

  // when you have a standard bit of text
  // selected with a blue selection
  if (!selection.empty) {
    selection.ranges.forEach((range) => {
      view.state.doc.nodesBetween(range.$from.pos, range.$to.pos, parseNode);
    });

    // when the cursor is positioned on an element
  } else if (range) {
    view.state.doc.nodesBetween(range.$from.pos, range.$to.pos, parseNode);

    // when you have just started editing the doc
  } else {
    let firstNode: Node;

    // get the first child node, and use that
    // to set the formatting
    view.state.doc.content.descendants((node) => {
      if (!firstNode) {
        firstNode = node;
        parseNode(firstNode);
      }
    });
  }

  let block: Block = 'multiple';

  if (blocks.size === 1) {
    block = blocks.values().next().value;
  }

  if (!blocks.has('h1') && !blocks.has('h2') && !blocks.has('h3')) {
    if (blocks.has('ol') && blocks.has('li')) {
      block = 'ol';
    }

    if (blocks.has('ul') && blocks.has('li')) {
      block = 'ul';
    }
  }

  editing.formatting = {
    block,
    marks: Array.from(marks),
  };
};
