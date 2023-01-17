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

function isRoot(
  objectPins: unknown
): objectPins is { [objectId: string]: { [pinId: string]: Pin } } {
  if (typeof objectPins !== 'object' || objectPins === null) {
    return false;
  }

  for (const objectId in objectPins) {
    for (const pinId in objectPins[objectId]) {
      if (!isPin(objectPins[pinId])) {
        return false;
      }
    }
  }

  return true;
}

function isPins(objectPins: unknown): objectPins is { [pinId: string]: Pin } {
  if (typeof objectPins !== 'object' || objectPins === null) {
    return false;
  }

  for (const pinId in objectPins) {
    if (!isPin(objectPins[pinId])) {
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
