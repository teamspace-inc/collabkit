export const CollabKitVueProviderUsage = `
<script setup lang="ts">
import { RouterView } from 'vue-router';
import { CollabKitVueProvider } from '@collabkit/vue';
import '@collabkit/react/dist/style.css';

const COLLABKIT_APP_ID = 'your app id';
const COLLABKIT_API_KEY = 'your api key';
</script>

<template>
  <CollabKitVueProvider
    :appId="COLLABKIT_APP_ID"
    :apiKey="COLLABKIT_API_KEY"
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
`;

export const CollabKitContextProviderUsage = `
<script setup lang="ts">
import { applyPureReactInVue } from 'veaury';
import { useCollabKitStore } from '@collabkit/vue';
import {
  CollabKitContextProvider as CollabKitContextProviderReact,
  Thread as ThreadReact,
} from '@collabkit/react';

const CollabKitContextProvider = applyPureReactInVue(
  CollabKitContextProviderReact
);
const Thread = applyPureReactInVue(ThreadReact);
const store = useCollabKitStore();
</script>

<template>
  <CollabKitContextProvider :store="store" theme="light">
    <!-- <template #renderAvatar="{ profile }">
      custom avatar component
    </template> -->
    <Thread threadId="vue-react-thread" />
  </CollabKitContextProvider>
</template>
`;

export const createCollabKitUsage = `
import { createApp } from 'vue';
import { createCollabKit } from '@collabkit/vue';
import App from './App.vue';

const app = createApp(App);
const collabkit = createCollabKit({
  appId: 'your app id',
  apiKey: 'your api key',
  workspace: {
    id: 'acme',
    name: 'ACME Corporation',
  },
  user: {
    id: 'jane',
    name: 'Jane Doe',
    email: 'jane@example.com',
  },
  mentionableUsers: 'allWorkspace',
});

app.use(collabkit);

app.mount('#app');
`;
