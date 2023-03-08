<script setup lang="ts">
import { CollabKitProvider } from './';

const apiKey = import.meta.env.VITE_COLLABKIT_UNSECURE_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_UNSECURE_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};
const user = { id: 'vueuser', name: 'Vue User', email: 'vue@example.com' };
</script>

<template>
  <CollabKitProvider
    :apiKey="apiKey"
    :appId="appId"
    :workspace="workspace"
    :user="user"
    :mentionableUsers="[]"
  >
    Hello world
  </CollabKitProvider>
</template>

<style scoped>
main {
  position: fixed;
  inset: 0;
}
</style>
