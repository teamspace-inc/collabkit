import { State, TextCardTarget } from 'state/constants';

export function getSelectedCard(state: State) {
  return state.store.editing.selectedIds.find((a): a is TextCardTarget => a.type === 'card');
}
