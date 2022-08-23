<script setup lang="ts">
import { type Timeline, timelineUtils } from '@collabkit/core';
import { commentListStyles } from '@collabkit/theme';
import { computed } from '@vue/reactivity';
import CommentGroup from './CommentGroup.vue';
import CurrentlyTyping from './comment/CurrentlyTyping.vue';
import { styled } from './styled';

const StyledCommentList = styled('div', commentListStyles.list);
const SeeAllRepliesLink = styled('div', commentListStyles.seeAllRepliesLink);

const props = defineProps<{
  isTyping?: { [endUserId: string]: boolean };
  timeline: Timeline;
  seenUntil?: string;
  workspaceId: string;
  userId: string;
  threadId: string;
  isPreview?: boolean;
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
    />
    <CurrentlyTyping v-if="!isPreview" :userId="userId" :isTyping="isTyping" />
    <SeeAllRepliesLink v-if="isPreview">
      <template v-if="list.length == 2">See 1 reply</template>
      <template v-else-if="list.length > 2"> See {{ list.length }} replies</template>
      <template v-else>Reply</template>
    </SeeAllRepliesLink>
  </StyledCommentList>
</template>
