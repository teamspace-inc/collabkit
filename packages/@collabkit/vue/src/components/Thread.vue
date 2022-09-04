<script setup lang="ts">
import { computed, inject, provide, useSlots, watchEffect } from 'vue';
import { actions } from '@collabkit/client';
import { commentStyles, composerStyles, threadStyles } from '@collabkit/theme';
import { styled } from './styled';
import { useStore } from '../composables/useStore';
import Composer from './composer/Composer.vue';
import EmptyState from './thread/EmptyState.vue';
import ScrollableCommentList from './ScrollableCommentList.vue';
import { ProvidedSlotsKey, ThemeKey } from '../constants';
import type { ProvidedTheme } from '../types';
import TypingIndicator from './TypingIndicator.vue';
import ComposerEditor from './composer/ComposerEditor.vue';
import Avatar from './Avatar';
import type { Target } from '@collabkit/core';
import ComposerSendButton from './composer/ComposerSendButton.vue';

const Root = styled('div', threadStyles.root);
const Content = styled('div', threadStyles.content);
const Header = styled('div', threadStyles.header);
const HeaderTitle = styled('div', threadStyles.headerTitle);
const TextOffset = styled('div', commentStyles.messageTextOffset);

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

const userId = computed(() => store.userId);
const workspaceId = computed(() => store.workspaceId);

watchEffect(() => {
  if (store.workspaceId && store.isSignedIn) {
    actions.subscribeThread(store, {
      workspaceId: store.workspaceId,
      threadId: props.threadId,
    });
    actions.saveThreadInfo(store, {
      workspaceId: store.workspaceId,
      threadId: props.threadId,
      isOpen: !isEmpty.value, // TODO: check if resolved
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

const theme = inject<ProvidedTheme>(ThemeKey)!;

const profile = computed(() => (userId.value === null ? null : store.profiles[userId.value]));
const composer = computed(() => {
  if (workspaceId.value === null) return null;
  return store.workspaces[workspaceId.value].composers[props.threadId];
});
const target = computed(
  (): Target => ({
    type: 'composer',
    threadId: props.threadId,
    workspaceId: workspaceId.value ?? '',
  })
);
</script>

<template>
  <div :style="{ display: 'contents' }" :className="theme.className">
    <Root v-if="store.userId && store.workspaceId" data-vv>
      <Content>
        <Header v-if="showHeader">
          <HeaderTitle>Comments</HeaderTitle>
        </Header>
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
        >
          <div v-if="profile">
            <Avatar :profile="profile" />
          </div>
          <ComposerEditor :target="target" :placeholder="placeholder" />
          <ComposerSendButton
            :bodyLength="composer?.$$body.length ?? 0"
            :workspaceId="workspaceId"
            :threadId="threadId"
            :type="'icon'"
          />
        </Composer>
        <TextOffset>
          <TypingIndicator
            :userId="store.userId"
            :isTyping="workspace?.composers[threadId]?.isTyping"
          />
        </TextOffset>
      </Content>
    </Root>
  </div>
</template>
