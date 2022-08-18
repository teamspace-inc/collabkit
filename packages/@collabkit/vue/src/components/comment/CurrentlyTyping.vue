<script setup lang="ts">
import type { Profile } from '@collabkit/core';
import { computed } from '@vue/reactivity';
import TypingIndicator from './TypingIndicator.vue';

const props = defineProps<{
  profiles: { [userId: string]: Profile };
  userId: string;
  isTyping?: { [userId: string]: boolean };
}>();

const currentlyTyping = computed(() =>
  Object.keys(props.isTyping ?? {})
    .filter((endUserId) => endUserId !== props.userId)
    .map((endUserId) => [endUserId, props.profiles[endUserId]])
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
