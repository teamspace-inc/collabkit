import { TLPageState, TLShape } from '@tldraw/core';
import Vec from '@tldraw/vec';

export function getScreenPoint<T extends TLShape>(point: number[], pageState: TLPageState<T>) {
  return Vec.mul(Vec.add(point, pageState.camera.point), pageState.camera.zoom);
}
