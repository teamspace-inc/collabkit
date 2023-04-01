import type { State, TextCardTarget } from 'state/constants';
import { targetEqual } from 'state/helpers';

export const removeTextFromIndex = (state: State, payload: { target: TextCardTarget }) => {
  const { search } = state.store;

  const indexItem = search.indexedItems[payload.target.id];
  if (!indexItem) {
    return;
  }

  search.engine.remove((item) => targetEqual(item.target, indexItem.target));
};
