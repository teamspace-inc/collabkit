import { Item, SpaceData } from 'state/constants';

export function getVisibleItems(data: SpaceData): Item[] {
  return Object.values(data.items).filter(
    (item) => item && !item.isDeleted && !data.pageState.hiddenIds.includes(item.id)
  );
}
