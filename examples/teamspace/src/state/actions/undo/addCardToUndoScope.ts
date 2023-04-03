import { Doc } from 'yjs';

import type { CardStore, State } from 'state/constants';

export const addCardToUndoScope = (state: State, info: { card: CardStore; doc: Doc }) => {
  if (state.currentSpace?.undoManager) {
    state.currentSpace.undoManager.addToScope([
      info.doc.getXmlFragment('text'),
      info.doc.getArray('props'),
    ]);
  } else {
    console.warn('[addCardToUndoScope] missing currentSpace.undoManager');
  }
};
