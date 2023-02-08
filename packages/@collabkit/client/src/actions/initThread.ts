import { Store, timelineUtils } from '@collabkit/core';
import { derive } from 'valtio/utils';

export function initThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const { workspaceId, threadId } = props;

  const workspace = store.workspaces[workspaceId];

  workspace.timeline[threadId] ||= {};
  workspace.threadProfiles[threadId] ||= {};

  const timeline = workspace.timeline;

  workspace.computed[threadId] ||= derive({
    isResolved: (get) => timelineUtils.computeIsResolved(get(timeline)[threadId]),
    groupedMessages: (get) => timelineUtils.groupedMessages(get(timeline)[threadId]),
    hasFetchedAllProfiles: (get) => {
      const missingProfiles = Object.values(get(timeline)[threadId])
        .map((event) => event.createdById)
        .filter((id) => get(store.profiles)[id] == null)
        .filter(function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        });
      if (missingProfiles.length > 0)
        console.warn(
          '[CollabKit] detected missing profiles, any threads with messages from these users will fail to load, profileIds:',
          missingProfiles
        );
      return Object.values(get(timeline)[threadId])
        .map((event) => event.createdById)
        .every((id) => get(store).profiles[id]);
    },
    messageEvents: (get) => timelineUtils.messageEvents(get(timeline)[threadId]),
    unreadCount: (get) => {
      const userId = get(store).userId;
      if (!userId) return 0;
      const seenUntilId = get(workspace).seen[threadId];
      const timeline = get(workspace).timeline[threadId] ?? {};

      const deletedIds = timelineUtils.deletedIds(timeline);
      const messageEventIds = Object.keys(timeline).filter(
        (eventId) => !deletedIds.has(eventId) && timeline[eventId].type === 'message'
      );

      if (seenUntilId == null) {
        return 0;
      }

      return (
        messageEventIds
          // we never want to count a users own messages as unread
          .filter((eventId) => timeline[eventId].createdById !== userId)
          .reduce((count, eventId) => {
            if (eventId > seenUntilId) return count + 1;
            return count;
          }, 0)
      );
    },
    reactions: (get) => timelineUtils.reactions(get(timeline)[threadId]),
    replyCount: (get) => timelineUtils.getReplyCount(get(timeline)[threadId]),
  });
}
