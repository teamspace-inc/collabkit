import { State, TextCardTarget } from 'state/constants';
import { shapeTargetToCardTarget } from './shapeTargetToCardTarget';

export function getSelectedLinkables(state: State) {
  return (
    state.store.editing.selectedIds
      // for now only cards are linkable, but the rest should
      // work with any two linkable targets
      .map((target) => shapeTargetToCardTarget(state, target))
      .filter((target): target is TextCardTarget => !!target)
  );
}
