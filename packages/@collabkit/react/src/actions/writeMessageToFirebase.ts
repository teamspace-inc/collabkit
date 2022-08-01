import { Event, Pin, Store } from '../constants';
import { actions } from '../actions';

export async function writeMessageToFirebase(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    body: string;
    preview: string;
    parentId?: string;
    type: 'message' | 'reaction';
    pin?: Pin;
  }
) {
  const { type, workspaceId, threadId, body, preview, pin, parentId } = props;

  if (store.isReadOnly) {
    console.warn('CollabKit: cannot send message in read-only mode');
    return;
  }

  if (!store.config.identify) {
    console.warn('[CollabKit] Did you forget to call CollabKit.identify?');
    return;
  }

  const userId = store.config.identify.userId;
  const appId = store.config.setup?.appId;

  if (!appId || !userId) {
    return;
  }

  // console.log('sending message', body);

  // close emoji picker on send
  store.reactingId = null;

  const event: Event = {
    type,
    body,
    createdAt: store.sync.serverTimestamp(),
    createdById: store.config.identify.userId,
  };

  if (parentId) {
    event.parentId = parentId;
  }

  try {
    const { id } = await store.sync.sendMessage({
      appId,
      userId,
      workspaceId,
      threadId,
      preview,
      pin,
      event,
    });

    store.workspaces[workspaceId].timeline[threadId] ||= {};
    store.workspaces[workspaceId].timeline[threadId][id] = {
      ...event,
      createdAt: +Date.now(),
    };

    // stop typing indicator as we sent the message successfully
    actions.stopTyping(store, { target: { type: 'composer', workspaceId, threadId } });
  } catch (e) {
    console.error(e);
    // handle failure here
  }
}
