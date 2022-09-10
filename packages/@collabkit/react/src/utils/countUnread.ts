import { timelineUtils, Workspace } from '@collabkit/core';

export function countUnread({ workspace, threadId }: { workspace: Workspace; threadId: string }) {
  const seenUntilId = workspace?.seen[threadId];
  const timeline = workspace?.timeline[threadId] ?? {};

  const deletedIds = timelineUtils.deletedIds(timeline);
  const messageEventIds = Object.keys(timeline).filter(
    (eventId) => !deletedIds.has(eventId) && timeline[eventId].type === 'message'
  );

  if (seenUntilId == null) {
    return messageEventIds.length;
  }

  return messageEventIds.reduce((count, eventId) => {
    if (eventId > seenUntilId) return count + 1;
    return count;
  }, 0);
}
