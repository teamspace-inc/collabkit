<script setup lang="ts">
import type { Profile } from '@collabkit/core';
import { typingIndicatorStyles } from '@collabkit/theme';
import { styled } from '../styled';
import { HStack } from '../UIKit';
import { StyledCommentContainer, StyledCommentMessage } from './StyledComment';

const StyledIsTypingText = styled('span', typingIndicatorStyles.typingText);

defineProps<{ profile: Profile }>();
</script>

<template>
  <StyledCommentContainer>
    <HStack>
      <StyledCommentMessage :profileIndent="true">
        <StyledIsTypingText>
          <span>{{ profile.name || profile.email }}</span> is typing...
        </StyledIsTypingText>
      </StyledCommentMessage>
    </HStack>
  </StyledCommentContainer>
</template>
