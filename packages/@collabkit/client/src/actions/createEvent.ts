import { Event, Store } from '@collabkit/core';
import { snapshot, getVersion, INTERNAL_Snapshot } from 'valtio';
const isValtioProxy = (obj: object) => typeof getVersion(obj) === 'number';
export async function createEvent(
  store: Store,
  props: {
    event: Event;
    parentEvent: Event | INTERNAL_Snapshot<Event> | null;
    threadId: string;
  }
) {
  const { event, parentEvent, threadId } = props;
  const appId = store.config.appId;
  const userId = store.userId;
  if (!userId) {
    throw new Error('CollabKit: cannot create event, anonymous user');
  }
  const workspaceId = store.workspaceId;
  if (!workspaceId) {
    throw new Error('CollabKit: cannot create event, no workspace');
  }
  const newEventId = store.sync.nextEventId({ appId, workspaceId, threadId });
  const promise = store.sync.sendMessage({
    appId,
    workspaceId,
    threadId,
    event: isValtioProxy(event) ? snapshot(event) : event,
    parentEvent: parentEvent
      ? isValtioProxy(parentEvent)
        ? snapshot(parentEvent)
        : parentEvent
      : null,
    newEventId,
    userId,
    timeline: store.workspaces[workspaceId].timeline[threadId],
  });
  const timelines = store.workspaces[workspaceId].timeline;
  timelines[threadId] ||= {};
  timelines[threadId][newEventId] = {
    ...event,
    createdAt: +Date.now(),
    id: newEventId,
  };
  try {
    await promise;
  } catch (e) {
    console.error(e);
    delete timelines[threadId][newEventId];
  }
  return timelines[threadId][newEventId];
}
