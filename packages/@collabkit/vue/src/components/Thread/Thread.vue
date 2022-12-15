<script setup lang="ts">
import ThreadRoot from './ThreadRoot.vue';
import ThreadHeader from './ThreadHeader.vue';
import Scrollable from '../Scrollable.vue';
import CommentList from '../CommentList.vue';
import { Composer } from '../Composer';
import type { ThreadInfo } from '@collabkit/core';

defineProps<{
  threadId: string;
  info?: Omit<ThreadInfo, 'defaultSubscribers'>;
  defaultSubscribers?: string[];
  showHeader?: boolean;
  autoFocus?: boolean;
  hideComposer?: boolean;
  hideResolveButton?: boolean;
}>();
</script>

<template>
  <ThreadRoot v-bind="$props">
    <ThreadHeader v-if="showHeader">Comments</ThreadHeader>
    <Scrollable autoScroll="bottom">
      <CommentList :hideResolveButton="hideResolveButton" />
    </Scrollable>
    <Composer v-if="!hideComposer" />
  </ThreadRoot>
</template>
