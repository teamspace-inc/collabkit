<script setup lang="ts">
import { nextTick, ref, computed, onBeforeUpdate, onUpdated, onMounted } from 'vue';
import { timelineUtils } from '@collabkit/core';
import type { Timeline } from '@collabkit/core';
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

const viewportRef = ref<{ element: HTMLDivElement } | null>(null);
let shouldScrollBottom = true;

onMounted(() => {
  let viewport = viewportRef.value?.element;
  if (viewport != null) {
    nextTick(() => {
      viewport = viewportRef.value?.element!;
      viewport.scrollTop = viewport.scrollHeight;
    });
  }
});

onBeforeUpdate(() => {
  const viewport = viewportRef.value?.element;
  if (viewport != null) {
    shouldScrollBottom = viewport.scrollTop + viewport.offsetHeight === viewport.scrollHeight;
  }
});

onUpdated(() => {
  let viewport = viewportRef.value?.element;
  if (viewport != null && shouldScrollBottom) {
    nextTick(() => {
      viewport = viewportRef.value?.element!;
      viewport.scrollTop = viewport.scrollHeight - viewport.offsetHeight;
    });
  }
});
</script>

<template>
  <ScrollAreaRoot>
    <ScrollAreaViewport ref="viewportRef">
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
