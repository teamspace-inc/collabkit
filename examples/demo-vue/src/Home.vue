<script setup lang="ts">
import { Thread, useUnreadCount } from '@collabkit/vue';
import { computed } from '@vue/reactivity';
import { useTitle } from '@vueuse/core';

const threadId = 'your-thread-id';
const unreadCount = useUnreadCount({ threadId });
const title = computed(() =>
  unreadCount.value > 0 ? `CollabKit Vue (${unreadCount.value})` : 'CollabKit vue'
);
useTitle(title);
</script>

<template>
  <Thread :threadId="threadId" autoFocus composerPrompt="Write a comment" />
</template>

<style scoped>
main {
  position: fixed;
  inset: 0;
}
</style>
