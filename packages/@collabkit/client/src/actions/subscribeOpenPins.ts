import { FirebaseId, FirebasePin, Pin, Store } from '@collabkit/core';
import { getConfig } from './index';
import has from 'has';

// move this to FirebaseSync

function isPin(pin: unknown): pin is FirebasePin {
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
  objects: unknown
): objects is { [objectId: string]: { [pinId: string]: FirebasePin } } {
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

function isPins(pins: unknown): pins is { [pinId: string]: FirebasePin } {
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
    const workspace = store.workspaces[workspaceId];
    if (isRoot(pins)) {
      for (const objectId in pins) {
        const decodedObjectId = FirebaseId.decode(objectId);
        workspace.openPins[decodedObjectId] ||= {};
        for (const pinId in pins[decodedObjectId]) {
          const firebasePin = pins[decodedObjectId][pinId];
          const { state, ...otherProps } = firebasePin;
          const pin: Pin = {
            ...otherProps,
            id: pinId,
            workspaceId,
            objectId: decodedObjectId,
            state: JSON.parse(state ?? '{}'),
          };
          workspace.eventPins[pin.eventId] = pin;
          workspace.openPins[decodedObjectId][pinId] = pin;
        }
      }
    } else {
      console.error('[CollabKit] invalid pins', pins);
    }
  }

  function onObjectChange(objectId: string, pins: unknown) {
    if (isPins(pins)) {
      const workspace = store.workspaces[workspaceId];
      workspace.openPins[objectId] ||= {};
      const currentPinIds = Object.keys(workspace.openPins[objectId]);
      const newPinIds = Object.keys(pins);
      const removedPinIds = currentPinIds.filter((id) => !newPinIds.includes(id));
      for (const pinId of removedPinIds) {
        const pin = workspace.openPins[objectId][pinId];
        delete workspace.eventPins[pin.eventId];
        delete workspace.openPins[objectId][pinId];
      }
      for (const pinId in pins) {
        const firebasePin = pins[pinId];
        const { state, ...otherProps } = firebasePin;
        const pin = {
          ...otherProps,
          id: pinId,
          workspaceId,
          objectId,
          state: JSON.parse(state ?? '{}'),
        };
        workspace.openPins[objectId][pinId] = pin;
        workspace.eventPins[pin.eventId] = pin;
      }
    } else {
      console.error('[CollabKit] invalid pins', pins);
    }
  }

  function onObjectRemove(objectId: string) {
    for (const pinId in store.workspaces[workspaceId].openPins[objectId]) {
      const pin = store.workspaces[workspaceId].openPins[objectId][pinId];
      delete store.workspaces[workspaceId].eventPins[pin.eventId];
    }

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
