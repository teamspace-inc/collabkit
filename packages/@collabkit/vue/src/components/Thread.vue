<script setup lang="ts">
import { computed, provide, useSlots, watchEffect } from 'vue';
import { actions } from '@collabkit/client';
import { threadStyles } from '@collabkit/theme';
import { styled } from './styled';
import { useStore } from '../composables/useStore';
import Composer from './Composer.vue';
import EmptyState from './thread/EmptyState.vue';
import ScrollableCommentList from './ScrollableCommentList.vue';
import { ProvidedSlotsKey } from '../constants';

const StyledThreadContainer = styled('div', threadStyles.container);
const StyledThread = styled('div', threadStyles.thread);
const StyledThreadHeader = styled('div', threadStyles.header);
const StyledThreadHeaderTitle = styled('div', threadStyles.headerTitle);

const props = defineProps<{
  threadId: string;
  info?: {
    name?: string;
    url?: string;
  };
  composerPrompt?: string;
  showHeader?: boolean;
  autoFocus?: boolean;
}>();

const store = useStore();

const workspace = computed(() => (store.workspaceId ? store.workspaces[store.workspaceId] : null));
const timeline = computed(() =>
  workspace.value ? workspace.value.timeline[props.threadId] : null
);
const isEmpty = computed(() => (timeline ? Object.keys(timeline).length === 0 : true));
const seenUntil = computed(() => workspace.value?.seen[props.threadId]);

watchEffect(() => {
  if (store.workspaceId && store.isSignedIn) {
    actions.subscribeThread(store, {
      workspaceId: store.workspaceId,
      threadId: props.threadId,
    });
    actions.saveThreadInfo(store, {
      workspaceId: store.workspaceId,
      threadId: props.threadId,
      info: {
        url: props.info?.url ?? window.location.href.toString(),
        name: props.info?.name || null,
      },
    });
  }
});

const placeholder = computed(
  () => props.composerPrompt ?? (isEmpty ? 'Add a comment' : 'Reply to this comment')
);

const slots = useSlots();
provide(ProvidedSlotsKey, slots);
</script>

<template>
  <StyledThreadContainer v-if="store.userId && store.workspaceId">
    <StyledThread>
      <StyledThreadHeader v-if="showHeader">
        <StyledThreadHeaderTitle>Comments</StyledThreadHeaderTitle>
      </StyledThreadHeader>
      <EmptyState v-if="store.isConnected && isEmpty" />
      <ScrollableCommentList
        v-if="!isEmpty && timeline && store.workspaceId"
        :seenUntil="seenUntil"
        :isTyping="workspace?.composers[threadId]?.isTyping"
        :threadId="threadId"
        :userId="store.userId"
        :workspaceId="store.workspaceId"
        :timeline="timeline"
      />
      <Composer
        :autoFocus="autoFocus"
        :placeholder="placeholder"
        :workspaceId="store.workspaceId"
        :threadId="threadId"
        :isFloating="false"
        :userId="store.userId"
        :isTyping="workspace?.composers[threadId]?.isTyping"
      />
    </StyledThread>
  </StyledThreadContainer>
</template>
