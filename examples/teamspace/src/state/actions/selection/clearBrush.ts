import type { State } from 'state/constants';
import { mutables } from 'state/mutables';
import assert from 'utils/assert';

import actions from '../';

export const clearBrush = (state: State) => {
  const { currentSpace } = state;
  assert(currentSpace, '[clearBrush] No currentSpace');
  currentSpace.pageState.brush = undefined;
  mutables.brushHits = undefined;
  actions.enter(state, 'idle');
  delete currentSpace.optimistic.selectBox;
};
