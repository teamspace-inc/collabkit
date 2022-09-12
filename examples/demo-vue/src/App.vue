<script setup lang="ts">
import { CollabKitProvider, type CustomTheme } from '@collabkit/vue';
import * as themes from '@collabkit/custom-themes';
import Home from './Home.vue';

const apiKey = import.meta.env.VITE_COLLABKIT_API_KEY;
const appId = import.meta.env.VITE_COLLABKIT_APP_ID;
const workspace = {
  id: import.meta.env.VITE_COLLABKIT_WORKSPACE_ID,
  name: import.meta.env.VITE_COLLABKIT_WORKSPACE_NAME,
};
const user = { id: 'vueuser', name: 'Vue User', email: 'vue@example.com' };

const name = location.pathname.slice(1);
const theme: CustomTheme | undefined =
  name in themes ? themes[name as keyof typeof themes] : undefined;
</script>

<template>
  <main>
    <CollabKitProvider
      :apiKey="apiKey"
      :appId="appId"
      :workspace="workspace"
      :user="user"
      :theme="theme"
    >
      <Home />
    </CollabKitProvider>
  </main>
</template>

<style scoped>
main {
  position: fixed;
  inset: 0;
}
</style>
