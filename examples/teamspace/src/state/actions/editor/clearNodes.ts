import { EditorState, Transaction } from 'prosemirror-state';
import { liftTarget } from 'prosemirror-transform';

/** Helper function which clears node style for the current selection so new styles can be applied reliably. Used to swtich block types. **/
export function clearNodes() {
  return (state: EditorState, dispatch?: (tr: Transaction) => void): boolean => {
    const tr = state.tr;
    const { selection } = tr;
    const { ranges } = selection;

    ranges.forEach((range) => {
      state.doc.nodesBetween(range.$from.pos, range.$to.pos, (node, pos) => {
        if (node.type.isText) {
          return;
        }

        const $fromPos = tr.doc.resolve(tr.mapping.map(pos));
        const $toPos = tr.doc.resolve(tr.mapping.map(pos + node.nodeSize));
        const nodeRange = $fromPos.blockRange($toPos);

        if (!nodeRange) {
          return;
        }

        const targetLiftDepth = liftTarget(nodeRange);

        if (node.type.isTextblock && dispatch) {
          const { defaultType } = $fromPos.parent.contentMatchAt($fromPos.index());

          tr.setNodeMarkup(nodeRange.start, defaultType);
        }

        if ((targetLiftDepth || targetLiftDepth === 0) && dispatch) {
          tr.lift(nodeRange, targetLiftDepth);
        }
      });
    });

    if (dispatch) dispatch(tr);

    return true;
  };
}
