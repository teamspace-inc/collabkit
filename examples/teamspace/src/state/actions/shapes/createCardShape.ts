import { TLPointerInfo } from '@tldraw/core';
import { nanoid } from 'nanoid';

import assert from 'utils/assert';

import { Item, State } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { createTextCard } from '../../../network/createTextCard';

export const createCardShape = (state: State, payload: { info: TLPointerInfo }) => {
  const { currentSpace } = state;

  assert(currentSpace, '[createCardShape] No currentSpace');
  assert(currentSpace.doc, '[createCardShape] No currentSpace.doc');

  const card = createTextCard(state, { duplicateCardId: undefined });
  const [x, y] = getPagePoint(payload.info.point, currentSpace.pageState);

  const shape: Item = {
    id: nanoid(),
    type: 'card',
    x,
    y,
    isDeleted: false,
    docId: card.docId,
  };

  currentSpace.items[shape.id] = shape;
  state.store.editing.selectedIds = [{ type: 'shape', id: shape.id }];
};
