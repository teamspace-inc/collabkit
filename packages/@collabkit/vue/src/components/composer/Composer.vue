<script setup lang="ts">
import { computed } from 'vue';
import { composerStyles } from '@collabkit/theme';
import { styled } from '../styled';
import { useStore } from '../../composables/useStore';

const props = defineProps<{
  workspaceId: string;
  threadId: string;
  userId: string;
  placeholder: string;
  autoFocus?: boolean;
}>();

const ComposerRoot = styled('div', composerStyles.root);

const store = useStore();

const composer = computed(() =>
  store.workspaces[props.workspaceId]
    ? store.workspaces[props.workspaceId].composers[props.threadId]
    : null
);
</script>

<template>
  <div>
    <div id="#mentions" :style="{ position: 'relative' }"></div>
    <ComposerRoot v-if="composer != null">
      <slot></slot>
    </ComposerRoot>
  </div>
</template>
