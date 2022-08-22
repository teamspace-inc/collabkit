<script setup lang="ts">
import { StoreKey, ThemeKey } from '../constants';
import { createVueStore } from '../stores/store';
import { actions, createEvents, FirebaseSync, initFirebase } from '@collabkit/client';
import type { Config, DeepPartial, Store, UserProps, WorkspaceProps } from '@collabkit/core';
import type { Theme } from '@collabkit/theme';
import { onMounted, provide } from 'vue';
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
provide(ThemeKey, currentTheme);

const store = createVueStore() as Store;
actions.init(store, props as Config, new FirebaseSync());
const events = createEvents(store);
provide(StoreKey, { store, events });

onMounted(() => {
  actions.monitorConnection(store, events);
});
</script>

<template>
  <span :className="currentTheme.className.toString()"><slot /></span>
</template>
