<script setup lang="ts">
import { Thread } from './';
import { createThemes } from '@collabkit/theme';
import { provide } from 'vue';
import { ThemeKey } from './constants';

// TODO: add something like CollabKit.Provider to inject these
const themes = createThemes();
const theme = themes.lightTheme;
provide(ThemeKey, theme);
</script>

<template>
  <main :className="theme.toString()">
    <Thread threadId="vue-chat" showHeader composerPrompt="Write a comment" />
  </main>
</template>

<style scoped>
main {
  position: fixed;
  inset: 0;
}
</style>
