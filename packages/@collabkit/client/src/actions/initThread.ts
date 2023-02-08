import { EventReactions, Store, timelineUtils } from '@collabkit/core';
import { derive } from 'valtio/utils';
import { DELETE_ID } from '../constants';

export function initThread(store: Store, props: { workspaceId: string; threadId: string }) {
  const { workspaceId, threadId } = props;

  const workspace = store.workspaces[workspaceId];

  workspace.timeline[threadId] ||= {};
  workspace.fetchedProfiles[threadId] ||= {};
  workspace.threadProfiles[threadId] ||= {};

  const timeline = workspace.timeline;
  const fetchedProfiles = workspace.fetchedProfiles;
  const threadProfiles = workspace.threadProfiles;

  workspace.computed[threadId] ||= derive({
    isResolved: (get) => timelineUtils.computeIsResolved(get(timeline)[threadId]),
    groupedMessages: (get) => timelineUtils.groupedMessages(get(timeline)[threadId]),
    hasFetchedAllProfiles: (get) => {
      const numFetchedProfiles = Object.keys(get(fetchedProfiles)[threadId] ?? {}).length;
      const numThreadProfiles = Object.keys(get(threadProfiles)[threadId] ?? {}).length;
      const numEvents = Object.keys(get(timeline)[threadId] ?? {}).length;
      return numEvents > 0 ? numFetchedProfiles === numThreadProfiles : false;
    },
    reactionEvents: (get) => timelineUtils.reactionEvents(get(timeline)[threadId]),
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
    reactions: (get) => {
      const reactions: { [eventId: string]: EventReactions } = {};
      const reactionEvents = timelineUtils.reactionEvents(get(timeline)[threadId]);
      for (const eventId in reactionEvents) {
        const event = reactionEvents[eventId];
        const { parentId } = event;
        if (!parentId) continue;
        const isDelete = event.body.startsWith(DELETE_ID);
        const emojiU = isDelete ? event.body.split(DELETE_ID)[1] : event.body;
        reactions[parentId] ||= {};
        reactions[parentId][emojiU] ||= { count: 0, userIds: [] };
        const reaction = reactions[parentId][emojiU];
        if (!isDelete) {
          reaction.count++;
          reaction.userIds.push(event.createdById);
        } else {
          reaction.count--;
          const index = reaction.userIds.findIndex((userId) => userId === event.createdById);
          if (index > -1) {
            reaction.userIds.splice(index, 1);
          }
          if (reaction.count <= 0) {
            delete reactions[parentId][emojiU];
          }
        }
      }

      return reactions;
    },
  });
}
