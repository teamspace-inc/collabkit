import { DataSnapshot } from 'firebase/database';
import { Store } from '../constants';

export function onTimelineEventAdded(store: Store, snapshot: DataSnapshot) {
  const event = snapshot.val();
  const eventId = snapshot.key;
  const workspaceId = snapshot.ref.parent?.ref.parent?.key;
  const threadId = snapshot.ref.parent?.key;

  // console.log('got event');

  // todo validate data here
  //
  if (threadId && workspaceId && eventId) {
    store.workspaces[workspaceId].timeline[threadId] ||= {};
    store.workspaces[workspaceId].timeline[threadId][eventId] ||= event;
  }
}
