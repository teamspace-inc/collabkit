import type { Store } from '@collabkit/core';
import type { Events } from '../events';
import { createEvents } from '../events';
import { monitorConnection } from './monitorConnection';

export function install(store: Store) {
  const events = createEvents(store);
  monitorConnection(store, events);

  store.subs['keydown'] ||= addKeyDownListener(events);
  store.subs['pointerdown'] ||= addPointerDownListener(events);
}

function addKeyDownListener(events: Events) {
  document.addEventListener('keydown', events.onKeyDown);
  return () => {
    document.removeEventListener('keydown', events.onKeyDown);
  };
}

function addPointerDownListener(events: Events) {
  document.addEventListener('pointerdown', events.onGlobalPointerDown);
  return () => {
    document.removeEventListener('pointerdown', events.onGlobalPointerDown);
  };
}
