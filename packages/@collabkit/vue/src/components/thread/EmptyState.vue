<script setup lang="ts">
import { threadEmptyStateStyles } from '@collabkit/theme';
import { Chats } from '../icons';
import { styled } from '../styled';
import { FlexCenter } from '../UIKit';

const EmptyStateContainer = styled('div', threadEmptyStateStyles.container);
const EmptyStateIcon = styled(Chats, threadEmptyStateStyles.icon);
const EmptyStateText = styled('span', threadEmptyStateStyles.text);
</script>

<template>
  <FlexCenter>
    <EmptyStateContainer>
      <EmptyStateIcon weight="regular" :size="32" />
      <EmptyStateText>Write a comment</EmptyStateText>
    </EmptyStateContainer>
  </FlexCenter>
</template>
