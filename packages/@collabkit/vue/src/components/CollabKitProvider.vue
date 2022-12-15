<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide } from 'vue';
import { StoreKey } from '../constants';
import { createVueStore } from '../stores/store';
import { actions, createEvents, FirebaseSync, initFirebase } from '@collabkit/client';
import type { Config, Store, UserProps, WorkspaceProps } from '@collabkit/core';
import type { CustomTheme } from '../theme/themes.css';

initFirebase();

const props = defineProps<{
  theme?: 'light' | 'dark' | CustomTheme;

  appId?: string;
  token?: string;

  apiKey?: string;
  user?: UserProps;
  workspace?: WorkspaceProps;
}>();

// const currentTheme = useTheme(props);
// provide<ProvidedTheme>(ThemeKey, currentTheme);

const store = createVueStore() as Store;
actions.init(store, props as Config, new FirebaseSync());
const events = createEvents(store);
provide(StoreKey, { store, events });

onMounted(() => {
  actions.monitorConnection(store, events);
});

// Set up keydown listener
onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown);
});
function onKeyDown(e: KeyboardEvent) {
  events.onKeyDown(e);
}
</script>

<template>
  <slot />
</template>
