<script setup lang="ts">
import { computed, ref } from 'vue';
import { getProfileColor } from '@collabkit/colors';
import type { Profile } from '@collabkit/core';
import * as styles from '../../theme/components/Profile.css';

const props = defineProps<{
  profile: Profile;
}>();

const didError = ref(false);
const style = computed(() =>
  props.profile.color
    ? {
        backgroundColor: getProfileColor(props.profile.color),
      }
    : undefined
);

function onError() {
  didError.value = true;
}
</script>

<template>
  <div v-if="didError || !profile.avatar" :class-name="styles.avatar" :style="style">
    {{ profile.name?.charAt(0) }}
  </div>
  <img v-else :class-name="styles.avatar" :src="profile.avatar" @error="onError" />
</template>
