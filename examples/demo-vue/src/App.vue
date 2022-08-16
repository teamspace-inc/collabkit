<script setup lang="ts">
import { Thread, ThemeKey } from '@collabkit/vue';
import { createThemes } from '@collabkit/theme';
import { provide } from 'vue';

// TODO: add something like CollabKit.Provider to inject these
const themes = createThemes();
const theme = themes.lightTheme;
provide(ThemeKey, theme);
</script>

<template>
  <main :className="theme.toString()">
    <Thread threadId="vue-chat" />
  </main>
</template>

<style scoped>
main {
  position: fixed;
  inset: 0;
}
</style>
