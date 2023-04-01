import { TLPointerInfo } from '@tldraw/core';
import { nanoid } from 'nanoid';

import { Item, TEXTS_KEY, State } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { XmlFragment } from 'yjs';

export const createStickyShape = (state: State, payload: TLPointerInfo) => {
  const space = state.currentSpace;

  if (!space) {
    console.warn('[createStickyShape] No current space');
    return;
  }

  if (!space.doc) {
    console.warn('[createStickyShape] No doc');
    return;
  }

  const [x, y] = getPagePoint(payload.point, space.pageState);

  const item: Item = {
    id: nanoid(),
    type: 'sticky',
    x,
    y,
    isDeleted: false,
  };

  space.items[item.id] = item;
  state.store.editing.selectedIds = [{ type: 'shape', id: item.id }];

  const texts = space.doc.getMap<XmlFragment>(TEXTS_KEY);
  space.doc.transact(() => {
    texts.set(item.id, new XmlFragment());
  }, 'createStickyShape');
  state.currentSpace!.undoManager!.stopCapturing();
};
