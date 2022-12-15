<script setup lang="ts">
import { provide, toRef } from 'vue';
import { ThreadKey } from '../../constants';
import { useStore } from '../../composables/useStore';

const store = useStore();
const props = defineProps<{ threadId: string }>();
provide(ThreadKey, toRef(props, 'threadId'));
</script>

<template>
  <slot v-if="store.userId && store.workspaceId" />
</template>
