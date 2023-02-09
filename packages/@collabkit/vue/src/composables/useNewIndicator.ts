import type { WithID, Event } from '@collabkit/core';
import { useWindowFocus } from '@vueuse/core';
import { ref, watchEffect } from 'vue';
import type { ComputedRef } from 'vue';

export function useNewIndicator(
  props: {
    userId: string;
    seenUntil?: string;
  },
  timelineEvents: ComputedRef<{
    messageEvents: WithID<Event>[];
  }>
) {
  const newIndicatorId = ref<string | null>(null);

  const isWindowFocused = useWindowFocus();

  watchEffect(() => {
    const { messageEvents } = timelineEvents.value;
    if (!isWindowFocused.value && !newIndicatorId.value) {
      const newEventId =
        messageEvents.find(
          (event) => event.createdById !== props.userId && event.id > props.seenUntil!
        )?.id ?? null;
      if (newEventId) {
        newIndicatorId.value = newEventId;
      }
    } else if (newIndicatorId.value) {
      const currentIndicator = newIndicatorId.value;
      const aNewerEventFromTheCurrentUser = newIndicatorId
        ? messageEvents.find(
            (event) => event.id > currentIndicator && event.createdById === props.userId
          )
        : null;
      if (aNewerEventFromTheCurrentUser) {
        newIndicatorId.value = null;
      }
    }
  });

  return newIndicatorId;
}
