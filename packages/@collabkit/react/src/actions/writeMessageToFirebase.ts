import { getDatabase, push, ref, serverTimestamp, update } from 'firebase/database';
import { CollabKitFirebaseApp, Event, Store } from '../constants';
import { timelineRef, actions } from '../actions';

export async function writeMessageToFirebase(
  store: Store,
  workspaceId: string,
  threadId: string,
  body: string,
  preview: string
) {
  if (!store.config.identify) {
    console.warn('[CollabKit] Did you forget to call CollabKit.identify?');
    return;
  }

  const userId = store.config.identify.userId;
  const appId = store.config.setup?.appId;

  if (!appId || !userId) {
    return;
  }

  console.log('sending message', body);

  // close emoji picker on send
  store.reactingId = null;

  const event: Event = {
    type: 'message',
    body: body,
    createdAt: serverTimestamp(),
    createdById: store.config.identify.userId,
  };

  // generate an id for the message
  const eventRef = await push(timelineRef(store, workspaceId, threadId));

  if (!eventRef.key) {
    console.warn('failed to gen push ref to timeline');
    return;
  }

  const data = {
    [`/timeline/${appId}/${workspaceId}/${threadId}/${eventRef.key}`]: event,
    [`/views/inbox/${appId}/${workspaceId}/${threadId}`]: {
      ...event,
      body: preview,
    },
  };

  // write the data to firebase
  await update(ref(getDatabase(CollabKitFirebaseApp)), data);

  if (eventRef.key !== null) {
    store.workspaces[workspaceId].timeline[threadId] ||= {};
    store.workspaces[workspaceId].timeline[threadId][eventRef.key] = {
      ...event,
      createdAt: +Date.now(),
    };

    // stop typing indicator as we sent the message successfully
    actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
  } else {
    console.error('CollabKit: failed to send message');
    // handle failure here
  }
}
