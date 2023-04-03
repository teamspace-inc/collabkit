import { TLBoundsCorner, TLPointerInfo } from '@tldraw/core';
// import { TextDefaultSize } from '../../../shapes/text/TextComponent';

import { Item, SpaceStore, TEXTS_KEY } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { mutables } from 'state/mutables';
import { nanoid } from '../../../utils/nanoid';
import { XmlFragment } from 'yjs';

export const createTextShape = (data: SpaceStore, payload: TLPointerInfo) => {
  // const leftDeadZone = hasLeftDeadZone(data, payload);
  // const size = leftDeadZone ? [1, 1] : TextDefaultSize;

  if (!data.doc) {
    return;
  }

  const [x, y] = getPagePoint(payload.point, data.pageState);
  const item: Item = {
    id: nanoid(),
    type: 'text',
    x,
    y,
    // size,
    isDeleted: false,
  };

  data.items[item.id] = item;
  // @todo fix this if we bring back text shape
  // data.pageState.selectedIds = [shape.id];
  mutables.pointedBoundsHandleId = TLBoundsCorner.BottomRight;

  const texts = data.doc.getMap<XmlFragment>(TEXTS_KEY);
  data.doc.transact(() => {
    texts.set(item.id, new XmlFragment());
  }, 'createTextShape');
};
