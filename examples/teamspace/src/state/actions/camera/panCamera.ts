import type { SpaceStore } from 'state/constants';
import type { TLPointerInfo } from '@tldraw/core';
import Vec from '@tldraw/vec';
import { getPagePoint } from 'state/helpers';

export const panCamera = (
  space: SpaceStore,
  info: TLPointerInfo | { delta: number[]; point?: number[] }
) => {
  if (!space) {
    return;
  }
  const { point, zoom } = space.pageState.camera;
  space.pageState.camera.point = Vec.sub(point, Vec.div(info.delta, zoom));
  if (info.point) {
    space.cursor = getPagePoint(info.point, space.pageState);
  }
};
