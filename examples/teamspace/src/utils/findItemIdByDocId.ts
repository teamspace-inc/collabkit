import { SpaceStore } from 'state/constants';
import { getVisibleItems } from 'state/helpers';

export function findItemIdByDocId(space: Readonly<SpaceStore>, docId: string): string | null {
  const item = getVisibleItems(space).find(
    (item) => (item.type === 'card' || item.type === 'table') && item.docId === docId
  );
  return item ? item.id : null;
}
