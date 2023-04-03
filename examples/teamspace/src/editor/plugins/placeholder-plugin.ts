import { Plugin } from 'prosemirror-state';
import type { Node as ProsemirrorNode } from 'prosemirror-model';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const placeholderPlugin = (placeholderClassName: string) =>
  new Plugin({
    props: {
      decorations(state) {
        const firstChild = state.doc.childCount > 0 ? state.doc.child(0) : null;
        const secondChild = state.doc.childCount > 1 ? state.doc.child(1) : null;

        if (!firstChild) {
          return null;
        }

        if (
          firstChild.type.name === 'paragraph' &&
          isEmpty(firstChild) &&
          state.doc.childCount === 1
        ) {
          return DecorationSet.create(state.doc, [
            Decoration.node(0, firstChild.nodeSize, {
              class: placeholderClassName,
            }),
          ]);
        }

        if (firstChild.type.name === 'heading' && firstChild.attrs.level === 1) {
          const decorations = [];
          if (isEmpty(firstChild)) {
            decorations.push(
              Decoration.node(0, firstChild.nodeSize, {
                class: placeholderClassName,
              })
            );
          }
          if (
            secondChild &&
            secondChild.type.name === 'paragraph' &&
            isEmpty(secondChild) &&
            state.doc.childCount <= 2
          ) {
            decorations.push(
              Decoration.node(firstChild.nodeSize, firstChild.nodeSize + secondChild.nodeSize, {
                class: placeholderClassName,
              })
            );
          }
          return DecorationSet.create(state.doc, decorations);
        }

        return null;
      },
    },
  });

function isEmpty(node: ProsemirrorNode): boolean {
  return node.textContent.length === 0 && node.childCount === 0;
}
