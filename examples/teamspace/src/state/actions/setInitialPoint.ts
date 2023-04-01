import type { TLPointerInfo } from '@tldraw/core';
import type { SpaceStore } from 'state/constants';
import { getPagePoint } from 'state/helpers';
import { mutables } from 'state/mutables';

export const setInitialPoint = (data: SpaceStore, payload: TLPointerInfo) => {
  mutables.initialPoint = getPagePoint(payload.origin, data.pageState);
};
