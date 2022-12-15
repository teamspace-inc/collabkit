<script setup lang="ts">
import { ProfileKey } from '../../constants';
import { inject } from 'vue';

const props = defineProps<{
  profileId: string;
}>();

inject(ProfileKey, props.profileId);
</script>

<template>
  <slot />
</template>
