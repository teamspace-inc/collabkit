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
  <main>
    <CollabKitContextProvider :store="store" theme="light">
      <!-- <template #renderAvatar="{ profile }">
        custom avatar component
      </template> -->
      <Thread threadId="vue-react-thread" />
    </CollabKitContextProvider>
  </main>
</template>
