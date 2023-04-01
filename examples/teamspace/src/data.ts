import type { TLUsers, TLBinding, TLPageState } from '@tldraw/core';
import { findItemIdByDocId } from './utils/findItemIdByDocId';
import { Shape, ShapeWithSize } from './shapes';
import applyRealtimeUpdates, { applyOptimisticUpdates } from './shapes/applyRealtimeUpdates';
import { SpaceData, PAGE_ID, User, EditingStore, GlobalStore, Target } from './state/constants';
import { ClientColor, ClientColors, ClientColorVariants } from './utils/Colors';
import { getShapeId } from 'state/helpers';

export function getPage(data: SpaceData, globalData: Readonly<GlobalStore>) {
  const shapes: Record<string, ShapeWithSize> = {};
  const linksBetweenItems = [...data.links];

  const defaults = {
    parentId: PAGE_ID,
    name: '',
    childIndex: 0,
  };

  const items = Object.values(data.items).filter((item) => item && !item.isDeleted);

  for (const item of items) {
    if (item.isDeleted) {
      continue;
    }

    if (
      item.id &&
      item.type &&
      item.hasOwnProperty('x') &&
      item.hasOwnProperty('y') &&
      typeof item.x === 'number' &&
      typeof item.y === 'number'
    ) {
      const { x, y, ...rest } = item;
      shapes[item.id] = {
        ...defaults,
        ...rest,
        point: [x, y],
        size: data.sizes[item.id] ?? [1000, 1000],
      };

      if (item.type === 'card') {
        const { links } = globalData.cards[item.docId].props;
        if (links && item.id) {
          Object.keys(links).forEach((linkId) => {
            const itemId = findItemIdByDocId(data, linkId);
            if (itemId) {
              linksBetweenItems.push([item.id, itemId]);
            }
          });
        }
      }
    } else {
      console.warn('[getPage] item has no x/y', item);
    }
  }

  applyRealtimeUpdates(data.realtime, shapes, data.appliedTransactions);
  applyOptimisticUpdates(
    data.optimistic,
    globalData.editing.selectedIds.map((target) =>
      target.type === 'tableCell' ? findItemIdByDocId(data, target.docId) || '' : target.id
    ),
    shapes
  );

  const allShapes: Record<string, Shape> = shapes;
  const bindings: Record<string, TLBinding> = {};
  for (const [fromId, toId] of linksBetweenItems) {
    const arrowId = `link:${fromId}:${toId}`;
    const fromShape = shapes[fromId];
    const toShape = shapes[toId];

    if (!fromShape || !toShape) {
      continue;
    }

    if (!data.sizes[fromId] || !data.sizes[toId]) {
      continue;
    }

    allShapes[arrowId] = {
      ...defaults,
      id: arrowId,
      type: 'arrow',
      point: [0, 0],
      start: fromShape,
      end: toShape,
      childIndex: -1,
    };
    bindings[`start:${arrowId}`] = {
      id: `start:${arrowId}`,
      fromId: arrowId,
      toId: fromId,
    };
    bindings[`end:${arrowId}`] = {
      id: `end:${arrowId}`,
      fromId: arrowId,
      toId: toId,
    };
  }

  const page = {
    id: PAGE_ID,
    bindings,
    shapes: allShapes,
  };
  return page;
}

const defaultPoint = [0, 0];

export function getUsers(data: SpaceData, globalData: Readonly<GlobalStore>) {
  const users: TLUsers<Shape, User> = {};
  for (const clientId in data.realtime) {
    const clientState = data.realtime[clientId];
    if (clientState.cursor) {
      let color = ClientColorVariants['sand'];

      if (globalData.clients[clientId]?.color) {
        if (Object.keys(ClientColors).includes(globalData.clients[clientId].color)) {
          const clientColor = globalData.clients[clientId].color as ClientColor;
          color = ClientColorVariants[clientColor];
        }
      }

      const selectedIds = clientState.selected
        ? Object.keys(clientState.selected).filter(
            (id) =>
              data.items[id] && !data.items[id].isDeleted && !data.pageState.hiddenIds.includes(id)
          )
        : [];

      users[clientId] = {
        id: clientId,
        color: color.backgroundColor,
        selectionColor: color.selectionColor,
        point: clientState.cursor ?? defaultPoint,
        selectedIds,
        selectBox: clientState.selectBox,
      };
    }
  }
  return users;
}

function isDeletedOrHidden(target: Target, data: SpaceData) {
  const shapeId = getShapeId(target, data);

  if (
    shapeId == null ||
    data.items[shapeId] == null ||
    (data.items[shapeId] && data.items[shapeId].isDeleted) ||
    data.pageState.hiddenIds.includes(shapeId)
  ) {
    return true;
  }

  return false;
}

export function getPageState(
  data: SpaceData,
  editingData: Readonly<EditingStore>
): TLPageState<Shape> {
  let editingId = getShapeId(editingData.editingId, data);
  return {
    ...data.pageState,
    editingId,
    selectedIds: editingData.selectedIds
      .filter((target) => !isDeletedOrHidden(target, data))
      .map((target) => getShapeId(target, data))
      .filter((id): id is string => id != null),
    hasSizes: data.sizes,
    hoveredId: editingData.hoveringId ? getShapeId(editingData.hoveringId, data) : null,
  };
}
