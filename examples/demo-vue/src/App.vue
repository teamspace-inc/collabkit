<script setup lang="ts">
import { Provider, Thread } from '@collabkit/vue';

const apiKey = 'oLsHFwp3uFYjgar37ygGc';
const appId = '-N67qY-qlZoWmkQBPyZU';
const workspace = { id: 'foobar' };
const user = { id: '1', name: 'Anonymous', email: 'anon@example.com' };

const theme = {
  radii: { 0: '4px' },
  fontSize: { 0: '12px', 1: '14px', 2: '14px', 3: '20px' },
  lineHeights: { 0: '20px', 1: '20px' },
  fontWeights: { 2: 500, 3: 700 },
  borders: {
    composer: '1px solid #404045',
  },
  colors: {
    sendButtonColor: '#414286',
    backgroundColor: '#1e1e21',
    composerBackground: '#1e1e21',
    composerPlaceholder: '#515159',
    primaryText: 'rgb(212,212,216)',
    caretColor: 'rgb(212,212,216)',
    commentHoverBackgroundColor: 'rgba(0,0,0,0.1)',
    commentUnseenBackgroundColor: '#3F3F45',
    commentUnseenHoverBackgroundColor: 'rgba(255,255,255,0.1)',
  },
  offsets: {
    composerSendButtonTop: '14px',
  },
};
</script>

<template>
  <main>
    <Provider :apiKey="apiKey" :appId="appId" :workspace="workspace" :user="user" :theme="theme">
      <Thread threadId="your-thread-id" showHeader autoFocus composerPrompt="Write a comment" />
    </Provider>
  </main>
</template>

<style scoped>
main {
  position: fixed;
  inset: 0;
}
</style>
