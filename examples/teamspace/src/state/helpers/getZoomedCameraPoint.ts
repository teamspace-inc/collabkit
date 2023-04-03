import { TLPageState, TLShape } from '@tldraw/core';
import Vec from '@tldraw/vec';

export function getZoomedCameraPoint<T extends TLShape>(
  nextZoom: number,
  center: number[],
  pageState: TLPageState<T>
) {
  const p0 = Vec.sub(Vec.div(center, pageState.camera.zoom), pageState.camera.point);
  const p1 = Vec.sub(Vec.div(center, nextZoom), pageState.camera.point);
  return Vec.toFixed(Vec.add(pageState.camera.point, Vec.sub(p1, p0)));
}
