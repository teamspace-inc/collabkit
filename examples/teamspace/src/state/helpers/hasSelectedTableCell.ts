import { State } from 'state/constants';

export function hasSelectedTableCell(state: State) {
  return state.store.editing.selectedIds.some((a) => a.type === 'tableCell');
}
