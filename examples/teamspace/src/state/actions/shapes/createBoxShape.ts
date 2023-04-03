import { TLBoundsCorner, TLPointerInfo } from '@tldraw/core';

import type { Item, StateWithSpace } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { mutables } from 'state/mutables';
import { nanoid } from '../../../utils/nanoid';

export const createBoxShape = (state: StateWithSpace, payload: TLPointerInfo) => {
  const [x, y] = getPagePoint(payload.point, state.currentSpace.pageState);
  const item: Item = {
    id: nanoid(),
    type: 'box',
    x,
    y,
    isDeleted: false,
  };
  state.currentSpace.items[item.id] = item;
  state.store.editing.selectedIds = [{ type: 'shape', id: item.id }];

  mutables.pointedBoundsHandleId = TLBoundsCorner.BottomRight;
};
