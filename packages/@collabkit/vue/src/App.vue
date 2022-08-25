<script setup lang="ts">
import { CollabKitProvider, Thread } from './';

const apiKey = 'oLsHFwp3uFYjgar37ygGc';
const appId = '-N67qY-qlZoWmkQBPyZU';
const workspace = { id: 'foobar' };
const user = { id: '1', name: 'Anonymous', email: 'anon@example.com' };
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
