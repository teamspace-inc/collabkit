<script setup lang="ts">
import type { Workspace } from '@collabkit/core';
import { threadStyles } from '@collabkit/theme';
import Composer from './Composer.vue';
import EmptyState from './thread/EmptyState.vue';
import { styled } from './styled';

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
  onCloseButtonClick?: (e: React.MouseEvent) => void;
}>();

function setComposerHeight() {}

const workspaceId = 'acme';
const workspace: Workspace = {
  profiles: {},
  name: 'ACME',
  pins: {},
  inbox: {},
  timeline: {},
  composers: {},
  seen: {},
  seenBy: {},
  threadInfo: {},
};

const isConnected = true;
const isEmpty = true;

const placeholder =
  props.composerPrompt != null
    ? props.composerPrompt
    : isEmpty
    ? 'Add a comment'
    : 'Reply to this comment';

const userId = 'jenny';
const profiles = {
  [userId]: {
    workspaceId: 'acme',
    name: 'Jenny',
    color: 'mint',
    avatar: 'https://example.com/non-existent.png',
  },
};
const profile = profiles[userId];
</script>

<template>
  <StyledThreadContainer>
    <StyledThread>
      <StyledThreadHeader v-if="showHeader">
        <StyledThreadHeaderTitle>Comments</StyledThreadHeaderTitle>
      </StyledThreadHeader>
      <EmptyState v-if="isConnected && isEmpty" />
      <Composer
        :style="{ paddingBottom: '12px' }"
        :workspace="workspace"
        :placeholder="placeholder"
        :workspaceId="workspaceId"
        @heightChange="setComposerHeight"
        :profile="profile"
        :threadId="threadId"
        :isFloating="false"
      />
    </StyledThread>
  </StyledThreadContainer>
</template>
