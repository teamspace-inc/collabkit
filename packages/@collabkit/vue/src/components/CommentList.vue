<script setup lang="ts">
import { timelineUtils } from '@collabkit/core';
import type { Timeline } from '@collabkit/core';
import { commentListStyles } from '@collabkit/theme';
import { computed } from 'vue';
import CommentGroup from './CommentGroup.vue';
import { styled } from './styled';

const StyledCommentList = styled('div', commentListStyles.list);

const props = defineProps<{
  isTyping?: { [endUserId: string]: boolean };
  timeline: Timeline;
  seenUntil?: string;
  workspaceId: string;
  userId: string;
  threadId: string;
  isPreview?: boolean;
  newIndicatorId?: string | null;
}>();

const reactions = computed(() => timelineUtils.reactions(props.timeline));
const list = computed(() => timelineUtils.groupedMessages(props.timeline));
const groups = computed(() => (props.isPreview ? list.value.slice(0, 1) : list.value));
</script>

<template>
  <StyledCommentList>
    <CommentGroup
      v-for="group in groups"
      :group="group"
      :userId="userId"
      :seenUntil="seenUntil"
      :reactions="reactions"
      :workspaceId="workspaceId"
      :threadId="threadId"
      :isPreview="isPreview"
      :newIndicatorId="newIndicatorId"
    />
  </StyledCommentList>
</template>
