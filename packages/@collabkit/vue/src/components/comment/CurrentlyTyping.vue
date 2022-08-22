<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useStore } from '../../composables/useStore';
import TypingIndicator from './TypingIndicator.vue';

const props = defineProps<{
  userId: string;
  isTyping?: { [userId: string]: boolean };
}>();

const store = useStore();

const currentlyTyping = computed(() =>
  Object.keys(props.isTyping ?? {})
    .filter((endUserId) => endUserId !== props.userId)
    .map((endUserId) => [endUserId, store.profiles[endUserId]])
);
</script>

<template>
  <TypingIndicator
    v-for="[endUserId, profile] in currentlyTyping"
    :key="endUserId"
    :profile="profile"
  />
</template>
); }
