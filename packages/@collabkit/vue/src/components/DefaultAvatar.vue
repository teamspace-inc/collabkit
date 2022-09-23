<script setup lang="ts">
import { computed, ref } from 'vue';
import { getProfileColor } from '@collabkit/colors';
import type { Profile } from '@collabkit/core';
import { avatarStyles } from '@collabkit/theme';
import { styled } from './styled';

const StyledAvatar = styled('img', avatarStyles.avatar);
const StyledFallbackAvatar = styled('div', avatarStyles.avatar);

const props = defineProps<{
  profile: Profile;
}>();

const didError = ref(false);
const style = computed(() =>
  props.profile.color
    ? {
        backgroundColor: getProfileColor(props.profile.color),
      }
    : null
);

function onError() {
  didError.value = true;
}
</script>

<template>
  <StyledFallbackAvatar v-if="didError || !profile.avatar" :style="style">
    {{ profile.name?.charAt(0) }}
  </StyledFallbackAvatar>
  <StyledAvatar v-else :src="profile.avatar" @error="onError" />
</template>
