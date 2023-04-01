import Vec from '@tldraw/vec';
import type { Clients, ClientState, OptimisticState } from 'realtime';
import type { Item } from 'state/constants';
import { Shape } from '../shapes';
import { getItemPoint } from 'state/helpers';

/**
 * Modifies an ID keyed object of Shapes according to realtime updates from
 * other clients passed in the first argument.
 *
 * NOTE: This function mutates the `Shape` objects in place.
 *
 * @param clients
 * @param shapes
 */
export default function applyRealtimeUpdates(
  clients: Clients,
  shapes: Record<string, Shape>,
  transactions?: Record<string, number[]>
) {
  for (const clientId in clients) {
    const client = clients[clientId];
    if (!client.selected) {
      continue;
    }
    const selectedIds = Object.keys(client.selected);
    if (client.drag) {
      applyMoveOptimistic(client, selectedIds, shapes, clientId, client.drag[2], transactions);
    }
  }
}

export function applyOptimisticUpdates(
  state: OptimisticState,
  selectedIds: string[],
  shapes: Record<string, Shape>
) {
  applyMoveOptimistic(state, selectedIds, shapes);
}

export function applyFileUploadProgress(
  state: ClientState | OptimisticState,
  shapes: Record<string, Shape>
) {
  if (state.fileUploadProgress) {
    if (shapes) {
      for (const id in state.fileUploadProgress) {
        if (shapes[id]) {
          shapes[id].fileUploadProgress = state.fileUploadProgress[id];
        }
      }
    }
  }
}

export function applyMoveOptimistic(
  state: OptimisticState,
  selectedIds: string[],
  shapes: Record<string, Shape>,
  clientId?: string,
  transactionId?: number,
  transactions?: Record<string, number[]>
) {
  if (state.drag && selectedIds.length) {
    const [deltaX, deltaY] = state.drag;
    const delta = [deltaX, deltaY];
    if (
      clientId &&
      transactionId &&
      transactions &&
      transactions[clientId]?.includes(transactionId)
    ) {
      return;
    }
    for (const itemId of selectedIds) {
      if (shapes[itemId]) {
        const nextPoint = Vec.add(shapes[itemId].point, delta);
        shapes[itemId].point = nextPoint;
      }
    }
  }
}

export function applyMove(
  state: ClientState | OptimisticState,
  selectedIds: string[],
  items: Record<string, Item>,
  clientId?: string,
  transactionId?: number,
  transactions?: Record<string, number[]>
) {
  if (state.drag && selectedIds.length) {
    const [deltaX, deltaY] = state.drag;
    const delta = [deltaX, deltaY];
    if (
      clientId &&
      transactionId &&
      transactions &&
      transactions[clientId]?.includes(transactionId)
    ) {
      return;
    }
    for (const itemId of selectedIds) {
      if (items[itemId]) {
        const point = getItemPoint(items[itemId]);
        if (point) {
          const nextPoint = Vec.add(point, delta);
          items[itemId].x = nextPoint[0];
          items[itemId].y = nextPoint[1];
        }
      }
    }
  }
}
