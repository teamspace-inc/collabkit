<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import type { Profile, Timeline } from '@collabkit/core';
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from './ScrollArea';
import CommentList from './CommentList.vue';

defineProps<{
  isTyping?: { [endUserId: string]: boolean };
  profiles: { [profileId: string]: Profile };
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
  isPreview?: boolean;
}>();

const viewport = ref<{ element: HTMLDivElement } | null>(null);
onMounted(async () => {
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
        :isTyping="isTyping"
        :profiles="profiles"
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
