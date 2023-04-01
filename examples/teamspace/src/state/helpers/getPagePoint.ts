import { TLPageState, TLShape } from '@tldraw/core';
import Vec from '@tldraw/vec';

export function getPagePoint<T extends TLShape>(
  point: number[],
  pageState: Pick<TLPageState<T>, 'camera'>
) {
  return Vec.sub(Vec.div(point, pageState.camera.zoom), pageState.camera.point);
}
