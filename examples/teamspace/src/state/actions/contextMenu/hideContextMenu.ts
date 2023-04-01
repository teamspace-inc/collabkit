import type { State } from 'state/constants';
import actions from '..';

export const hideContextMenu = (state: State) => {
  actions.enter(state, 'idle');
};
