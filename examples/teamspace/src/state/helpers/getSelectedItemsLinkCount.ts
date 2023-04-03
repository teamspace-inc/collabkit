import { State } from 'state/constants';

/** Returns the number of items the selected item is connected to. */
export function getSelectedItemsLinkCount(state: State) {
  const { selectedIds } = state.store.editing;
  const space = state.currentSpace;
  if (!space) {
    return 0;
  }

  if (selectedIds.length === 0) {
    return 0;
  }

  // if one item is selected, we assume the user intends to find
  // out how many items it's connected to
  if (selectedIds.length === 1) {
    return space?.links.filter(
      (link) => selectedIds[0].id === link[0] || selectedIds[0].id === link[1]
    ).length;
  }

  // if more than 1 item is selected, we now only
  // want connections only between the selected items
  return space?.links.filter(
    (link) =>
      selectedIds.some((target) => target.id === link[0]) &&
      selectedIds.some((target) => target.id === link[1])
  ).length;
}
