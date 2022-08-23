import { getConfig } from './index';
import type { Sync, ThreadInfo, Store } from '@collabkit/core';

export async function subscribeThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    info?: ThreadInfo;
  }
) {
  store.workspaces[props.workspaceId].composers[props.threadId] ||= {
    $$body: '',
    isTyping: {},
    editor: null,
  };
  const { workspaceId, threadId } = props;
  const { appId, userId } = getConfig(store);
  store.sync.subscribeThread({
    appId,
    userId,
    workspaceId,
    threadId,
    subs: store.subs,
    onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => {
      store.workspaces[event.workspaceId].timeline[event.threadId] ||= {};
      store.workspaces[event.workspaceId].timeline[event.threadId][event.eventId] ||= event.event;
      if (store.profiles[event.event.createdById]) {
        store.workspaces[event.workspaceId].timeline[event.threadId][event.eventId].hasProfile =
          true;
      }
    },
    onThreadTypingChange: ({ workspaceId, threadId, userId, isTyping }: Sync.TypingEvent) => {
      store.workspaces[workspaceId].composers[threadId].isTyping[userId] = isTyping;
    },
    onThreadSeenByUser: (event: Sync.ThreadSeenEvent) => {
      store.workspaces[event.workspaceId].seenBy[event.threadId] ||= {};
      store.workspaces[event.workspaceId].seenBy[event.threadId][event.userId] = event.data;
    },
  });
}
