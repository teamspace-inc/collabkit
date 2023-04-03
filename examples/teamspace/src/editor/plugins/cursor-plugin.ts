import * as Y from 'yjs';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { EditorState, Plugin } from 'prosemirror-state';
import {
  yCursorPluginKey,
  ySyncPluginKey,
  absolutePositionToRelativePosition,
  relativePositionToAbsolutePosition,
} from 'y-prosemirror';
import * as math from 'lib0/math';
import { YCursor } from '../types';

export const createDecorations = (
  state: EditorState,
  clientId: string,
  docId: string,
  cursors: Record<string, Record<string, YCursor> | null>,
  renderCursor: (clientId: string) => HTMLElement,
  getSelectionStyle: (clientId: string) => string
) => {
  if (!cursors || !cursors[docId]) {
    return DecorationSet.create(state.doc, []);
  }
  const ystate = ySyncPluginKey.getState(state);
  const y = ystate.doc;
  const decorations: Decoration[] = [];
  if (ystate.snapshot != null || ystate.prevSnapshot != null || ystate.binding === null) {
    // do not render cursors while snapshot is active
    return DecorationSet.create(state.doc, []);
  }

  for (const _clientId in cursors[docId]) {
    if (_clientId === clientId) {
      return;
    }
    const cursor = cursors[docId]?.[_clientId];
    if (!ystate.binding) {
      return;
    }
    if (cursor && cursor != null) {
      let anchor = relativePositionToAbsolutePosition(
        y,
        ystate.type,
        Y.createRelativePositionFromJSON(cursor.anchor),
        ystate.binding.mapping
      );
      let head = relativePositionToAbsolutePosition(
        y,
        ystate.type,
        Y.createRelativePositionFromJSON(cursor.head),
        ystate.binding.mapping
      );
      if (anchor !== null && head !== null) {
        const maxsize = math.max(state.doc.content.size - 1, 0);
        anchor = math.min(anchor, maxsize);
        head = math.min(head, maxsize);
        decorations.push(
          Decoration.widget(head, () => renderCursor(_clientId), { key: _clientId + '', side: 10 })
        );
        const from = math.min(anchor, head);
        const to = math.max(anchor, head);
        decorations.push(
          Decoration.inline(
            from,
            to,
            { style: getSelectionStyle(_clientId) },
            { inclusiveEnd: true, inclusiveStart: false }
          )
        );
      }
    }
  }

  return DecorationSet.create(state.doc, decorations);
};

export const yCursorPlugin = (
  clientId: string,
  docId: string,
  store: {
    yCursors: Record<string, Record<string, YCursor> | null>;
    localYCursors: Record<string, YCursor | null>;
  },
  renderCursor: (clientId: string) => HTMLElement,
  getSelectionStyle: (clientId: string) => string,
  { getSelection = (state: EditorState) => state.selection } = {}
) =>
  new Plugin({
    key: yCursorPluginKey,
    state: {
      init(_, state) {
        return createDecorations(
          state,
          clientId,
          docId,
          store.yCursors,
          renderCursor,
          getSelectionStyle
        );
      },
      apply(tr, prevState, oldState, newState) {
        const ystate = ySyncPluginKey.getState(newState);
        const yCursorState = tr.getMeta(yCursorPluginKey);
        if ((ystate && ystate.isChangeOrigin) || yCursorState) {
          return createDecorations(
            newState,
            clientId,
            docId,
            store.yCursors,
            renderCursor,
            getSelectionStyle
          );
        }
        return prevState?.map(tr.mapping, tr.doc);
      },
    },
    props: {
      decorations: (state) => {
        return yCursorPluginKey.getState(state);
      },
    },
    view: (view) => {
      const updateCursorInfo = () => {
        const ystate = ySyncPluginKey.getState(view.state);
        // @note We make implicit checks when checking for the cursor property
        const { localYCursors } = store;

        if (view.hasFocus() && ystate.binding !== null) {
          const selection = getSelection(view.state);
          const anchor = absolutePositionToRelativePosition(
            selection.anchor,
            ystate.type,
            ystate.binding.mapping
          );
          const head = absolutePositionToRelativePosition(
            selection.head,
            ystate.type,
            ystate.binding.mapping
          );
          if (
            localYCursors[docId] == null ||
            (localYCursors[docId] &&
              !Y.compareRelativePositions(
                Y.createRelativePositionFromJSON(localYCursors[docId]?.anchor),
                anchor
              )) ||
            (localYCursors[docId] &&
              !Y.compareRelativePositions(
                Y.createRelativePositionFromJSON(localYCursors[docId]?.head),
                head
              ))
          ) {
            store.localYCursors[docId] = { anchor, head };
          }
        } else if (
          localYCursors[docId] != null &&
          ystate.binding != null &&
          relativePositionToAbsolutePosition(
            ystate.doc,
            ystate.type,
            Y.createRelativePositionFromJSON(localYCursors[docId]?.anchor),
            ystate.binding.mapping
          ) !== null
        ) {
          // delete cursor information if current cursor information is owned by this editor binding
          store.localYCursors[docId] = null;
        }
      };
      view.dom.addEventListener('focusin', updateCursorInfo);
      view.dom.addEventListener('focusout', updateCursorInfo);
      return {
        update: updateCursorInfo,
        destroy: () => {
          view.dom.removeEventListener('focusin', updateCursorInfo);
          view.dom.removeEventListener('focusout', updateCursorInfo);
          store.localYCursors[docId] = null;
        },
      };
    },
  });
