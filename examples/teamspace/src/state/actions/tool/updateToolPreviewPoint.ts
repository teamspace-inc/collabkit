import { TLPointerInfo } from '@tldraw/core';
import { SpaceStore } from 'state/constants';
import { getPagePoint } from 'state/helpers';

export const updateToolPreviewPoint = (space: SpaceStore, payload: TLPointerInfo) => {
  if (space.pageState.toolPreview) {
    space.pageState.toolPreview.point = getPagePoint(payload.point, space.pageState);
  }
};
