import { TLPointerInfo } from '@tldraw/core';
import { nanoid } from 'nanoid';
import { createTableCard } from 'network/createTableCard';

import { Item, State } from 'state/constants';
import { getPagePoint } from 'state/helpers';

export const createTableShape = (state: State, payload: { info: TLPointerInfo }) => {
  const space = state.currentSpace;

  if (!space) {
    console.warn('[createTableShape] No current space');
    return;
  }

  if (!space.doc) {
    console.warn('[createTableShape] No current space');
    return;
  }

  const card = createTableCard(state, { duplicateCardId: undefined });

  const [x, y] = getPagePoint(payload.info.point, space.pageState);

  const item: Item = {
    id: nanoid(),
    type: 'table',
    x,
    y,
    isDeleted: false,
    docId: card.docId,
  };

  space.items[item.id] = item;
  state.store.editing.selectedIds = [{ type: 'shape', id: item.id }];
  state.currentSpace!.undoManager!.stopCapturing();
};
