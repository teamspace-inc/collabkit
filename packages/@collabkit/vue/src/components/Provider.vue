<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide } from 'vue';
import { StoreKey, ThemeKey } from '../constants';
import { createVueStore } from '../stores/store';
import { actions, createEvents, FirebaseSync, initFirebase } from '@collabkit/client';
import type { Config, DeepPartial, Store, UserProps, WorkspaceProps } from '@collabkit/core';
import type { Theme } from '@collabkit/theme';
import type { ProvidedTheme } from '../types';
import { useTheme } from '../composables/useTheme';

initFirebase();

const props = defineProps<{
  colorScheme?: 'light' | 'dark' | 'auto';
  theme?: DeepPartial<Theme>;

  appId?: string;
  token?: string;

  apiKey?: string;
  user?: UserProps;
  workspace?: WorkspaceProps;
}>();

const currentTheme = useTheme(props);
provide<ProvidedTheme>(ThemeKey, currentTheme);

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
