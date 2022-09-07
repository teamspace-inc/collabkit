import { Workspace } from '@collabkit/core';

export function countUnread({ workspace, threadId }: { workspace: Workspace; threadId: string }) {
  const seenUntilId = workspace?.seen[threadId];
  const timeline = workspace?.timeline[threadId] ?? {};

  const messageEventIds = Object.keys(timeline).filter(
    (eventId) => timeline[eventId].type === 'message'
  );

  if (seenUntilId == null) {
    return messageEventIds.length;
  }

  return messageEventIds
    .filter((eventId) => timeline[eventId].type === 'message')
    .reduce((count, eventId) => {
      if (eventId > seenUntilId) return count + 1;
      return count;
    }, 0);
}
