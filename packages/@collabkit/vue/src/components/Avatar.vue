<script setup lang="ts">
import { getShade } from '@collabkit/colors';
import type { Profile } from '@collabkit/core';
import { avatarStyles } from '@collabkit/theme';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { styled } from './styled';

const StyledAvatar = styled('img', avatarStyles.avatar);
const StyledDefaultAvatar = styled('div', avatarStyles.avatar);

const props = withDefaults(
  defineProps<{
    profile: Profile;
    size?: 24 | 28 | 32;
  }>(),
  {
    size: 24,
  }
);

const didError = ref(false);
const style = computed(() =>
  props.profile.color
    ? {
        backgroundColor: getShade(props.profile.color, 9),
      }
    : null
);

function onError() {
  didError.value = true;
}
</script>

<template>
  <StyledDefaultAvatar v-if="didError || !profile.avatar" :size="size" :style="style">
    {{ profile.name?.charAt(0) }}
  </StyledDefaultAvatar>
  <StyledAvatar v-else :size="size" :src="profile.avatar" @error="onError" />
</template>
