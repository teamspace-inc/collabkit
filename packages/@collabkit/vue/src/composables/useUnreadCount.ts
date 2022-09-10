import { timelineUtils } from '@collabkit/core';
import { computed, type ComputedRef } from 'vue';
import { useStore } from './useStore';

export function useUnreadCount(props: { threadId: string }): ComputedRef<number> {
  const store = useStore();
  const unreadCount = computed(() => {
    const { workspaceId, workspaces } = store;
    const workspace = workspaceId ? workspaces[workspaceId] : null;
    const seenUntilId = workspace?.seen[props.threadId];
    const timeline = workspace?.timeline[props.threadId] ?? {};

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
  });

  return unreadCount;
}
