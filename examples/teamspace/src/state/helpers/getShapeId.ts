import { SpaceData, Target } from 'state/constants';

export function getShapeId(target: Target | null | undefined, data: SpaceData) {
  if (target == null) {
    return null;
  }

  if (target.type === 'shape') {
    return target.id;
  }

  if (
    target.type === 'card' ||
    target.type === 'tableCell' ||
    target.type === 'tableRow' ||
    target.type === 'tableColumn' ||
    target.type === 'table'
  ) {
    // we can make this lookup cleaner by storing a reverse index of docId -> shapeId in a space
    return Object.values(data.items).find(
      (item) => (item.type === 'card' || item.type === 'table') && item.docId === target.id
    )?.id;
  }

  return null;
}
