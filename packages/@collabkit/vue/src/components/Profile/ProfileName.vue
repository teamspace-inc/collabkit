<script setup lang="ts">
import * as styles from '../../theme/components/Profile.css';
import { useStore } from '../../composables/useStore';
import { useProfile } from '../../composables/useProfile';

const store = useStore();
const { profileId } = useProfile();
const profile = store.profiles[profileId];
</script>

<template>
  <span :class-name="styles.name">{{ profile?.name ?? profile?.email ?? 'Anonymous' }}</span>
</template>
