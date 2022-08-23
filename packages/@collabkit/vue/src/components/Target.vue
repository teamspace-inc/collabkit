<script setup lang="ts">
import { provide } from 'vue';
import type { Target as TargetType } from '@collabkit/core';
import { TargetKey } from '../constants';

const props = defineProps<{
  target: TargetType;
}>();

provide(TargetKey, props.target);
</script>

<template>
  <slot />
</template>
