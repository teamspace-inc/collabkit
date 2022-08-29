<script setup lang="ts">
import { Thread, useUnreadCount } from '@collabkit/vue';
import { computed } from 'vue';
import { useTitle } from '@vueuse/core';

const threadId = 'new-your-thread-id';
const unreadCount = useUnreadCount({ threadId });
const title = computed(() =>
  unreadCount.value > 0 ? `CollabKit Vue (${unreadCount.value})` : 'CollabKit Vue'
);
useTitle(title);
</script>

<template>
  <Thread :threadId="threadId" autoFocus composerPrompt="Write a comment" />
</template>
