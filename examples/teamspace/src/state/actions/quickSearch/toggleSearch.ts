import { State } from 'state/constants';
import actions from '..';

export const toggleSearch = (state: State) => {
  if (state.store.uiState === 'search.showing') actions.hideSearch(state);
  else actions.showSearch(state);
};
