<script setup lang="ts">
import { onBeforeUnmount, onMounted, provide, watchEffect } from 'vue';
import { actions, createCollabKitStore, createEvents } from '@collabkit/client';
import type {
  Config,
  MentionableUsers,
  SecureConfig,
  UnsecureConfig,
  UserProps,
  WorkspaceProps,
} from '@collabkit/core';
import { storeKey } from '../constants';

const props = defineProps<{
  appId: string;
  token?: string;
  apiKey?: string;
  mentionableUsers: MentionableUsers;
  user?: UserProps;
  workspace?: WorkspaceProps;
}>();

let authConfig: SecureConfig | UnsecureConfig;
if (props.token) {
  if (props.user) throw new Error('Prop "user" is not allowed in secure mode');
  if (props.workspace) throw new Error('Prop "workspace" is not allowed in secure mode');
  authConfig = {
    appId: props.appId,
    token: props.token,
  };
} else if (props.apiKey) {
  if (!props.user) throw new Error('Prop "user" is required in unsecure mode');
  if (!props.workspace) throw new Error('Prop "workspace" is required in unsecure mode');
  authConfig = {
    appId: props.appId,
    apiKey: props.apiKey,
    user: props.user,
    workspace: props.workspace,
  };
} else {
  throw new Error('token (secure mode) or apiKey (unsecure mode) is required');
}

const store = createCollabKitStore({
  ...authConfig,
  mentionableUsers: props.mentionableUsers,
});

provide(storeKey, store);

onMounted(() => {
  actions.install(store);
});
onBeforeUnmount(() => {
  createEvents(store).onDestroy();
});

watchEffect(() => {
  actions.setConfig(store, props as Config);
});
</script>

<template>
  <slot />
</template>
