<script setup lang="ts">
import { RouterView } from 'vue-router';
import { CollabKitVueProvider } from '@collabkit/vue';
import '@collabkit/react/dist/style.css';

const COLLABKIT_APP_ID = import.meta.env.VITE_COLLABKIT_APP_ID;
const COLLABKIT_API_KEY = import.meta.env.VITE_COLLABKIT_API_KEY;
</script>

<template>
  <CollabKitVueProvider
    :appId="COLLABKIT_APP_ID"
    :apiKey="COLLABKIT_API_KEY"
    theme="dark"
    :workspace="{
      id: 'acme',
      name: 'ACME Corporation',
    }"
    :user="{
      id: 'jane',
      name: 'Jane Doe',
      email: 'jane@example.com',
    }"
    mentionableUsers="allWorkspace"
  >
    <RouterView />
  </CollabKitVueProvider>
</template>
