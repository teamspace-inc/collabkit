<script setup lang="ts">
import { computed } from 'vue';
import { typingIndicatorStyles } from '@collabkit/theme';
import { useStore } from '../composables/useStore';
import { styled } from './styled';

const StyledIsTypingContainer = styled('div', typingIndicatorStyles.container);
const Name = styled('span', typingIndicatorStyles.name);

const props = defineProps<{
  userId: string;
  isTyping?: { [userId: string]: boolean };
}>();

const store = useStore();
const names = computed(() => {
  const isTyping = props.isTyping;
  if (isTyping == null) {
    return [];
  }
  const ids = Object.keys(isTyping).filter((id) => id !== props.userId && isTyping[id] === true);
  return ids
    .map((id) => store.profiles[id]?.name || store.profiles[id]?.email)
    .filter((name): name is string => typeof name === 'string' && !!name);
});
</script>

<template>
  <div :style="{ marginLeft: 52 }">
    <StyledIsTypingContainer v-if="names.length === 0" />
    <StyledIsTypingContainer v-if="names.length === 1">
      <Name>{{ names[0] }}</Name> is typing…
    </StyledIsTypingContainer>
    <StyledIsTypingContainer v-if="names.length === 2">
      <Name>{{ names[0] }}</Name> and <Name>{{ names[1] }}</Name> are typing…
    </StyledIsTypingContainer>
    <StyledIsTypingContainer v-if="names.length === 3">
      <Name>{{ names[0] }}</Name
      >, <Name>{{ names[1] }}</Name> and <Name>{{ names[2] }}</Name> are typing…
    </StyledIsTypingContainer>
    <StyledIsTypingContainer v-if="names.length > 3">
      <Name>{{ names[0] }}</Name
      >, <Name>{{ names[1] }}</Name> and <Name>{{ names.length - 2 }} others</Name> are typing…
    </StyledIsTypingContainer>
  </div>
</template>
