import { actions } from './index';
import { getConfig } from './getConfig';
import { Sync, ThreadInfo, Store, WithID, Event } from '@collabkit/core';
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

  function onTimelineChangeEvent(event: Sync.TimelineChangeEvent) {
    store.workspaces[event.workspaceId].timeline[event.threadId][event.eventId] ||= {
      ...event.event,
      id: event.eventId,
    };
    if (store.config.mentionableUsers === 'allWorkspace') return;
    actions.subscribeProfile(store, {
      profileId: event.event.createdById,
      onSubscribe: () => {},
    });
  }

  const t0 = performance.now();
  store.sync.subscribeThread({
    appId,
    userId,
    workspaceId,
    threadId,
    subs: store.subs,
    onTimelineEventAdded: (event: Sync.TimelineChangeEvent) => {
      onTimelineChangeEvent(event);
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
      store.workspaces[event.workspaceId].threadProfiles[event.threadId][event.userId] = true;
      if (store.config.mentionableUsers === 'allWorkspace') return;
      subscribeProfile(store, {
        profileId: event.userId,
        onSubscribe: () => {},
      });
    },
    onTimelineGetComplete: (events: Sync.TimelineChangeEvent[]) => {
      console.log('onTimelineGetComplete', events.length);
      if (!events.length) {
        return;
      }
      const { workspaceId, threadId } = events[0];
      store.workspaces[workspaceId].timeline[threadId] = events.reduce<{
        [key: string]: WithID<Event>;
      }>((acc, event) => {
        acc[event.eventId] = event.event;
        return acc;
      }, {});
      const t1 = performance.now();
      console.log(`onTimelinegGetComplete took ${t1 - t0} milliseconds.`);
      if (store.config.mentionableUsers === 'allWorkspace') return;
      events
        .map((event) => event.event.createdById)
        .filter(function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        })
        .map((userId) =>
          actions.subscribeProfile(store, { profileId: userId, onSubscribe: () => {} })
        );
    },
    onThreadProfiles: (event: Sync.ThreadProfilesEvent) => {
      store.workspaces[event.workspaceId].threadProfiles[event.threadId] = event.profiles;
      if (store.config.mentionableUsers === 'allWorkspace') return;
      for (const profileId of Object.keys(event.profiles)) {
        if (store.profiles[profileId]) return;
        subscribeProfile(store, {
          profileId,
          onSubscribe: () => {},
        });
      }
    },
  });
}
