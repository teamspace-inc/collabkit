import { TLPointerInfo } from '@tldraw/core';
import { mutables } from '../mutables';

export function isConsecutiveClick(info: TLPointerInfo<any>) {
  if (info.pointId && mutables.pointId) {
    return info.pointId < mutables.pointId + 1;
  }
  return false;
}
