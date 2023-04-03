import { State } from 'state/constants';
import { mutables } from 'state/mutables';

export const clearSnapInfo = (state: State) => {
  mutables.snapInfo = undefined;
};
