import { TLClipboard } from '@tldraw/core';
import type { SpaceStore } from 'state/constants';

export function setClipboard(data: SpaceStore, clipboard: TLClipboard) {
  data.pageState.clipboard = clipboard;
  // data.doc?.transact(() => {
  //   data.doc?.getMap(UNDO_KEY).set('clipboard', clipboard);
  // }, 'undo');
  if (data.pageState.clipboard.state === 'cut') {
    data.pageState.hiddenIds = data.pageState.clipboard.ids;
  } else {
    data.pageState.hiddenIds = [];
  }
}
