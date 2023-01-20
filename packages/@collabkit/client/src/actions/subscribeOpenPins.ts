import type { Pin, Store } from '@collabkit/core';
import { getConfig } from './index';
import has from 'has';

function isPin(pin: unknown): pin is Pin {
  return (
    typeof pin === 'object' &&
    pin !== null &&
    has(pin, 'x') &&
    has(pin, 'y') &&
    typeof pin['x'] === 'number' &&
    typeof pin['y'] === 'number' &&
    has(pin, 'threadId') &&
    typeof pin['threadId'] === 'string'
  );
}

function isRoot(objects: unknown): objects is { [objectId: string]: { [pinId: string]: Pin } } {
  if (typeof objects !== 'object' || objects === null) {
    return false;
  }

  const _objects = objects as { [objectId: string]: unknown };

  for (const objectId in _objects) {
    if (typeof _objects[objectId] !== 'object' || _objects[objectId] === null) {
      return false;
    }

    const pins = _objects[objectId] as { [pinId: string]: unknown };

    if (!isPins(pins)) {
      return false;
    }
  }

  return true;
}

function isPins(pins: unknown): pins is { [pinId: string]: Pin } {
  if (typeof pins !== 'object' || pins === null) {
    return false;
  }

  const _pins = pins as { [pinId: string]: unknown };

  for (const pinId in _pins) {
    if (!isPin(_pins[pinId])) {
      return false;
    }
  }

  return true;
}

export function subscribeOpenPins(store: Store) {
  const { appId, workspaceId } = getConfig(store);

  function onGet(pins: any) {
    if (isRoot(pins)) {
      store.workspaces[workspaceId].openPins = pins;
    } else {
      console.error('[CollabKit] invalid pins', pins);
    }
  }

  function onObjectChange(objectId: string, pins: any) {
    if (isPins(pins)) {
      store.workspaces[workspaceId].openPins[objectId] = pins;
    } else {
      console.error('[CollabKit] invalid pins', pins);
    }
  }

  function onObjectRemove(objectId: string) {
    delete store.workspaces[workspaceId].openPins[objectId];
  }

  store.sync.subscribeOpenPins({
    appId,
    workspaceId,
    subs: store.subs,
    onGet,
    onObjectChange,
    onObjectRemove,
  });
}
