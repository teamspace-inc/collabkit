import { TLDragInfo } from '@tldraw/core';
import type { Item, State } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { saveImageFile } from '../../../utils/File';
import { mutables } from 'state/mutables';

export const drop = async (state: State, payload: TLDragInfo) => {
  if (!state.currentSpace) {
    console.warn('[drop] No current space');
    return;
  }

  if (!payload.file || !payload.data || !mutables.fileStoreDB) {
    console.warn('[drop] No file, data or fileStoreDB');
    return;
  }

  try {
    const result = await saveImageFile(mutables.fileStoreDB, payload.file, payload.data);
    if (!result) {
      console.debug('drop: failed to save file');
      return;
    }

    const { id, size } = result;

    const [x, y] = getPagePoint(payload.point, state.currentSpace.pageState);
    const item: Item = {
      id,
      type: 'image',
      x,
      y,
      size,
      isDeleted: false,
      url: 'filestore://' + id,
    };

    state.currentSpace.items[item.id] = item;
    state.store.editing.selectedIds = [{ type: 'shape', id: item.id }];
  } catch (e) {
    console.error('failed to drop', e);
  }
};
