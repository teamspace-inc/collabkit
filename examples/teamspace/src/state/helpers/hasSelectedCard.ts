import { State } from 'state/constants';

export function hasSelectedCard(state: State) {
  return state.store.editing.selectedIds.some((a) => a.type === 'card');
}
