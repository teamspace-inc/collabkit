import { TLBoundsHandleTarget, TLPointerInfo } from '@tldraw/core';
import type { State } from 'state/constants';
import { mutables } from 'state/mutables';

export const setPointedBoundsHandle = (state: State, info: TLPointerInfo<TLBoundsHandleTarget>) => {
  mutables.pointedBoundsHandleId = info.target.id;
};
