import { Item, SpaceStore } from 'state/constants';
import { ShapeWithSize } from 'shapes';

export function itemToShape(sizes: SpaceStore['sizes'], item: Item): ShapeWithSize {
  return {
    id: item.id,
    type: item.type,
    point: [item.x, item.y],
    size: sizes[item.id],
    parentId: 'page1',
    name: '',
    childIndex: 0,
  };
}
