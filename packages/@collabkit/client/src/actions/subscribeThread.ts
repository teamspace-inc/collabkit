import { actions, getConfig } from './index';
import { Sync, ThreadInfo, Store } from '@collabkit/core';
import { subscribeProfile } from './subscribeProfile';
import { initComposer } from './initComposer';
import { initThread } from './initThread';

export async function subscribeThread(
  store: Store,
  props: {
    workspaceId: string;
    threadId: string;
    info?: ThreadInfo;
  }
) {
  const { workspaceId, threadId } = props;

  const key = `${workspaceId}-${threadId}`;

  if (store.subs[key]) {
    // prevent double-subscription early
    console.log('already subscribed to thread', key);
    return;
  }

  store.subs[key] = () => {};

  initThread(store, { workspaceId, threadId });

  initComposer(store, {
    workspaceId,
    threadId,
    eventId: 'default',
  });

  const { appId, userId } = getConfig(store);

  store.sync.subscribeThread({
    appId,
    userId,
    workspaceId,
    threadId,
    subs: store.subs,
    onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => {
      store.workspaces[event.workspaceId].timeline[event.threadId][event.eventId] ||= {
        ...event.event,
        id: event.eventId,
      };
      actions.subscribeProfile(store, {
        profileId: event.event.createdById,
        onSubscribe: () => {
          store.workspaces[event.workspaceId].fetchedProfiles[event.threadId][
            event.event.createdById
          ] = true;
        },
      });
    },
    onThreadTypingChange: ({ workspaceId, threadId, userId, isTyping }: Sync.TypingEvent) => {
      store.workspaces[workspaceId].composers[threadId]['default'].isTyping[userId] = isTyping;
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
    onThreadProfile: (event: Sync.ThreadProfileEvent) => {
      subscribeProfile(store, {
        profileId: event.userId,
        onSubscribe: () => {
          store.workspaces[event.workspaceId].fetchedProfiles[event.threadId][event.userId] = true;
        },
      });
    },
    onTimelineGetComplete: () => {},
    onThreadProfiles: (event: Sync.ThreadProfilesEvent) => {
      store.workspaces[event.workspaceId].threadProfiles[event.threadId] = event.profiles;
    },
  });
}
