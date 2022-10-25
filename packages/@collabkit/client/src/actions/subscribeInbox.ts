import type { Event, Store, WithID } from '@collabkit/core';
import { actions } from './index';
import { createWorkspace } from '../store';

export async function subscribeInbox(store: Store) {
  const { userId, workspaceId, config } = store;
  const appId = config.appId;

  if (!userId || !workspaceId || !appId) {
    return;
  }

  function onInboxChange(props: { threadId: string; event: WithID<Event> }) {
    if (!props.threadId) {
      return;
    }

    if (!workspaceId) {
      return;
    }

    store.workspaces[workspaceId] ||= createWorkspace();
    store.workspaces[workspaceId].inbox[props.threadId] = props.event;

    actions.subscribeThread(store, { workspaceId, threadId: props.threadId });
  }

  store.sync.subscribeInbox({ appId, workspaceId, subs: store.subs, onInboxChange });
}
