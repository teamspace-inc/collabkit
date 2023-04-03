import type { SpaceStore } from 'state/constants';
import type { TLPointerInfo } from '@tldraw/core';
import Vec from '@tldraw/vec';

export const invertedPanCamera = (data: SpaceStore, payload: TLPointerInfo) => {
  const { point, zoom } = data.pageState.camera;

  if (!Number.isFinite(zoom) || zoom <= 0) {
    console.error('zoom is out of range', { zoom });
    return;
  }

  data.pageState.camera.point = Vec.sub(point, Vec.div(Vec.neg(payload.delta), zoom));
};
