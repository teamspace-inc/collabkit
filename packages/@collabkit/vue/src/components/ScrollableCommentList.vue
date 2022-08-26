<script setup lang="ts">
import { nextTick, onMounted, ref, computed, watch } from 'vue';
import { timelineUtils } from '@collabkit/core';
import type { Profile, Timeline } from '@collabkit/core';
import { useNewIndicator } from '../composables/useNewIndicator';
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './ScrollArea';
import CommentList from './CommentList.vue';

const props = defineProps<{
  isTyping?: { [endUserId: string]: boolean };
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
  seenUntil?: string;
  isPreview?: boolean;
}>();

const timelineEvents = computed(() => ({
  messageEvents: timelineUtils.messageEvents(props.timeline),
  reactionEvents: timelineUtils.reactionEvents(props.timeline),
}));

const newIndicatorId = useNewIndicator(props, timelineEvents);

const viewport = ref<{ element: HTMLDivElement } | null>(null);
const scrollDependencies = computed(() => {
  const { messageEvents, reactionEvents } = timelineEvents.value;
  return [
    viewport,
    messageEvents.length,
    // did react to last message
    reactionEvents[reactionEvents.length - 1]?.parentId ===
      messageEvents[messageEvents.length - 1]?.id,
    // check that all profiles are loaded
    messageEvents.every((event) => event.hasProfile),
    newIndicatorId.value === null,
  ];
});
watch(scrollDependencies, () => {
  if (viewport.value) {
    const { element } = viewport.value;
    if (element.scrollTop + element.offsetHeight === element.scrollHeight) {
      nextTick(() => {
        element.scrollTop = element.scrollHeight;
      });
    }
  }
});
onMounted(() => {
  if (viewport.value) {
    const { element } = viewport.value;
    nextTick(() => {
      element.scrollTop = element.scrollHeight;
    });
  }
});
</script>

<template>
  <ScrollAreaRoot>
    <ScrollAreaViewport ref="viewport">
      <CommentList
        :newIndicatorId="newIndicatorId"
        :seenUntil="seenUntil"
        :isTyping="isTyping"
        :threadId="threadId"
        :userId="userId"
        :workspaceId="workspaceId"
        :isPreview="isPreview"
        :timeline="timeline"
      />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
