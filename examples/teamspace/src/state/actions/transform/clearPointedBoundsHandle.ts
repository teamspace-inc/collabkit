import type { State } from 'state/constants';
import { mutables } from 'state/mutables';

export const clearPointedBoundsHandle = (state: State) => {
  mutables.pointedBoundsHandleId = undefined;
};
