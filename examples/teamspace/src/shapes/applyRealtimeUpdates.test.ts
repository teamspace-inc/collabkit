import type { ShapeWithSize } from './';
import applyRealtimeUpdates from './applyRealtimeUpdates';
import { HandleId } from '../utils/Handle';

jest.mock('../utils/setupLocalStorage.ts');
jest.mock('../environment');

const DEFAULTS = {
  parentId: 'page1',
  name: '',
};

function createTestShapes(): Record<string, ShapeWithSize> {
  return {
    item1: {
      id: 'item1',
      type: 'box',
      point: [0, 0],
      size: [50, 50],
      childIndex: 0,
      ...DEFAULTS,
    },
    item2: {
      id: 'item2',
      type: 'box',
      point: [200, 0],
      size: [50, 50],
      childIndex: 1,
      ...DEFAULTS,
    },
    item3: {
      id: 'item3',
      type: 'box',
      point: [300, 0],
      size: [50, 50],
      childIndex: 2,
      ...DEFAULTS,
    },
  };
}

it('applies drag operations', () => {
  const initialShapes = createTestShapes();
  const shapes = createTestShapes();
  const deltaX = 25;
  const deltaY = 30;
  const transactionId = 1;
  applyRealtimeUpdates(
    {
      client1: {
        createdAt: 1638811154901,
        uid: 'uid1',
        selected: { item1: { type: 'card' }, item2: { type: 'card' } },
        drag: [deltaX, deltaY, transactionId],
        color: 'red',
      },
    },
    shapes
  );
  expect(shapes.item1.point).toStrictEqual([
    initialShapes.item1.point[0] + deltaX,
    initialShapes.item1.point[1] + deltaY,
  ]);
  expect(shapes.item2.point).toStrictEqual([
    initialShapes.item2.point[0] + deltaX,
    initialShapes.item2.point[1] + deltaY,
  ]);
  expect(shapes.item3.point).toStrictEqual(initialShapes.item3.point);
});

it('applies drag operations from multiple clients', () => {
  const initialShapes = createTestShapes();
  const shapes = createTestShapes();
  const deltaX = 25;
  const deltaY = 30;
  const transactionId = 2;
  applyRealtimeUpdates(
    {
      client1: {
        createdAt: 1638811154901,
        uid: 'uid1',
        selected: { item1: { type: 'card' } },
        drag: [deltaX, deltaY, transactionId],
        color: 'red',
      },
      client2: {
        createdAt: 1638811154902,
        uid: 'uid1',
        selected: { item2: { type: 'card' } },
        drag: [-deltaX, -deltaY, transactionId],
        color: 'blue',
      },
      client3: {
        createdAt: 1638811154903,
        uid: 'uid2',
        color: 'green',
      },
    },
    shapes
  );
  expect(shapes.item1.point).toStrictEqual([
    initialShapes.item1.point[0] + deltaX,
    initialShapes.item1.point[1] + deltaY,
  ]);
  expect(shapes.item2.point).toStrictEqual([
    initialShapes.item2.point[0] - deltaX,
    initialShapes.item2.point[1] - deltaY,
  ]);
  expect(shapes.item3.point).toStrictEqual(initialShapes.item3.point);
});

it('ignores realtime transaction that have been applied by the data provider', () => {
  const appliedTransactionId = 5;
  const initialShapes = createTestShapes();
  const shapes = createTestShapes();
  applyRealtimeUpdates(
    {
      client1: {
        createdAt: 1638811154999,
        uid: 'uid1',
        selected: { item1: { type: 'card' } },
        resize: [1000, 1000, true, appliedTransactionId, HandleId.BottomRight],
        color: 'red',
      },
    },
    shapes,
    { client1: [appliedTransactionId] }
  );
  expect(shapes.item1.size).toStrictEqual(initialShapes.item1.size);
});
