import { TLPointerInfo } from '@tldraw/core';
import Vec from '@tldraw/vec';
import { SpaceData } from 'state/constants';
import { mutables } from 'state/mutables';
import { getPagePoint } from './getPagePoint';

export function hasLeftDeadZone(data: SpaceData, payload: TLPointerInfo) {
  return Vec.dist(getPagePoint(payload.point, data.pageState), mutables.initialPoint) > 3;
}
