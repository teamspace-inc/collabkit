import { ShapeTarget, State } from 'state/constants';

export function getSelectedShape(state: State) {
  return state.store.editing.selectedIds.find((a): a is ShapeTarget => a.type === 'shape');
}
