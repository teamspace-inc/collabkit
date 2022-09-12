<script setup lang="ts">
import { CollabKitProvider, Thread } from './';

const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};
const user = { id: 'vueuser', name: 'Vue User', email: 'vue@example.com' };
</script>

<template>
  <main>
    <CollabKitProvider :apiKey="apiKey" :appId="appId" :workspace="workspace" :user="user">
      <Thread threadId="your-thread-id" showHeader composerPrompt="Write a comment" />
    </CollabKitProvider>
  </main>
</template>

<style scoped>
main {
  position: fixed;
  inset: 0;
}
</style>
