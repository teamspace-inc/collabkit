import { State } from 'state/constants';

export function getLinkCountBetweenItems(state: State) {
  state.currentSpace?.links.filter(
    (link) =>
      state.store.editing.selectedIds.some((target) => target.id === link[0]) &&
      state.store.editing.selectedIds.some((target) => target.id === link[1])
  ).length;
}
