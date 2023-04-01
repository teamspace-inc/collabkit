import type { State } from 'state/constants';
import { targetEqual } from 'state/helpers';
import { filterSearchResults } from './_filterSearchResults';

export const search = (state: State, props: { query: string; preserveSelection?: boolean }) => {
  const { search } = state.store;
  const { query } = props;

  if (query === '') {
    search.query = '';
    search.results = [];
    search.selectedId = null;
    return;
  }

  search.query = query;
  search.results = search.engine
    .search(query)
    .filter((result) => filterSearchResults(result, state));

  if (
    props.preserveSelection &&
    search.results?.find((result) => targetEqual(result.item.target, search.selectedId))
  ) {
    // do nothing
  } else {
    search.selectedId = search.results?.[0]?.item.target;
  }
};
