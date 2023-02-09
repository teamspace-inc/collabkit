import { Store, timelineUtils, WithID, Event } from '@collabkit/core';
import { snapshot } from 'valtio';
import { derive } from 'valtio/utils';

export function initThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const { workspaceId, threadId } = props;

  const workspace = store.workspaces[workspaceId];

  workspace.timeline[threadId] ||= {};
  workspace.threadProfiles[threadId] ||= {};

  const { timeline } = workspace;

  workspace.computed[threadId] ||= derive({
    isResolved: (get) => timelineUtils.computeIsResolved(get(timeline)[threadId]),
    groupedMessages: (get) => timelineUtils.groupedMessages(get(timeline)[threadId]),
    hasFetchedAllProfiles: (get) => {
      return Object.values(get(timeline[threadId]))
        .map((event) => event.createdById)
        .every((id) => get(store.profiles)[id]);
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
    canonicalEvents: (get) => {
      const events = get(timeline)[threadId];
      const editedEvents: { [key: string]: WithID<Event> | null } = {};
      for (const eventId of Object.keys(events)) {
        const editedEvent = timelineUtils.findLatestEdit(events, eventId);
        if (editedEvent) editedEvents[eventId] = editedEvent;
      }
      return { ...events, ...editedEvents };
    },
  });
}
