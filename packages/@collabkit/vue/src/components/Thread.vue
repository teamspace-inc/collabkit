<script setup lang="ts">
import type { Workspace } from '@collabkit/core';
import { func } from 'prop-types';
import Composer from './Composer.vue';

const props = defineProps<{
  threadId: string;
  info?: {
    name?: string;
    url?: string;
  };
  composerPrompt?: string;
  showHeader?: boolean;
  //header?
  //emptyState?
  showHeaderCloseIcon?: boolean;
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

const isEmpty = true;

const placeholder = props.composerPrompt
  ? props.composerPrompt
  : isEmpty
  ? 'Add a comment'
  : 'Reply to this comment';

const userId = 'jenny';
const profiles = {
  [userId]: {
    workspaceId: 'acme',
  },
};
const profile = profiles[userId];
</script>

<template>
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
</template>
