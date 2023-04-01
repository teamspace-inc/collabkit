import type { State } from 'state/constants';
import actions from '..';

export const hideSearch = (state: State) => {
  actions.enter(state, 'idle');
};
