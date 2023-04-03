import { State } from 'state/constants';
import actions from '..';

export const showSearch = (state: State) => {
  const { search } = state.store;

  actions.enter(state, 'search.showing');

  // if we have an existing search query
  // load fresh results so any new items
  // or deletes are reflected in the
  // search bar
  if (search.query) {
    actions.search(state, { query: search.query, preserveSelection: true });
  }
};
