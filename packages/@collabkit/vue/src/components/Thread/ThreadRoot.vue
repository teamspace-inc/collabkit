<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import ThreadProvider from './ThreadProvider.vue';
import { ProfileProvider } from '../Profile';
import ThemeWrapper from '../ThemeWrapper.vue';
import type { ThreadInfo } from '@collabkit/core';
import { useThreadSubscription } from '../../composables/useThreadSubscription';
import { useStore } from '../../composables/useStore';
import { useSaveThreadInfo } from '../../composables/useSaveThreadInfo';

const props = defineProps<{
  threadId: string;
  info?: Omit<ThreadInfo, 'defaultSubscribers'>;
  defaultSubscribers?: string[];
}>();
const store = useStore();
useThreadSubscription(props);
useSaveThreadInfo(props);
</script>

<template>
  <ThreadProvider v-if="store.userId" :threadId="props.threadId">
    <ProfileProvider :profileId="store.userId">
      <ThemeWrapper>
        <div v-bind="$attrs">
          <slot />
        </div>
      </ThemeWrapper>
    </ProfileProvider>
  </ThreadProvider>
</template>
