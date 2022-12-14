import { actions, getConfig } from './index';
import type { Sync, ThreadInfo, Store } from '@collabkit/core';
import { createComposer } from '../store';

export async function subscribeThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    info?: ThreadInfo;
  }
) {
  // console.log('subscribeThread', props.threadId);
  store.workspaces[props.workspaceId].composers[props.threadId] ||= createComposer();
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
      store.workspaces[event.workspaceId].timeline[event.threadId][event.eventId] ||= {
        ...event.event,
        id: event.eventId,
      };
      actions.subscribeProfile(store, event.event.createdById);
    },
    onThreadTypingChange: ({ workspaceId, threadId, userId, isTyping }: Sync.TypingEvent) => {
      store.workspaces[workspaceId].composers[threadId].isTyping[userId] = isTyping;
    },
    onThreadSeenByUser: (event: Sync.ThreadSeenEvent) => {
      store.workspaces[event.workspaceId].seenBy[event.threadId] ||= {};
      store.workspaces[event.workspaceId].seenBy[event.threadId][event.userId] = event.data;
    },
    onThreadInfo: (event: Sync.ThreadInfoChangeEvent) => {
      if (event.info) {
        store.workspaces[event.workspaceId].threadInfo[event.threadId] = event.info;
      } else {
        delete store.workspaces[event.workspaceId].threadInfo[event.threadId];
      }
    },
  });
}
