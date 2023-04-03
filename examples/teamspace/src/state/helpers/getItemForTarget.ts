import { SpaceStore, Target } from 'state/constants';

export function getItemForTarget(items: SpaceStore['items'], target: Target) {
  if (!items) {
    return null;
  }

  if (target.type === 'shape') {
    return items[target.id];
  }

  if (target.type === 'table' || target.type === 'card') {
    return (
      Object.values(items).find((item) =>
        item.type === 'table' || item.type === 'card' ? item.docId === target.id : false
      ) ?? null
    );
  }

  if (target.type === 'tableColumn' || target.type === 'tableRow') {
    return (
      Object.values(items).find((item) =>
        item.type === 'table' ? item.docId === target.docId : false
      ) ?? null
    );
  }

  return null;
}
