import type { SelectableTarget, State } from 'state/constants';

export const deselectAllButGivenShape = (state: State, target: SelectableTarget) => {
  state.store.editing.selectedIds = [target];
};
