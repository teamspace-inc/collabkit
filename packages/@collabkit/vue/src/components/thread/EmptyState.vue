<script setup lang="ts">
import { threadEmptyStateStyles } from '@collabkit/theme';
import { Chats } from '../icons';
import { styled } from '../styled';
import { FlexCenter } from '../UIKit';

const Root = styled('div', threadEmptyStateStyles.root);
const Icon = styled(Chats, threadEmptyStateStyles.icon);
const Text = styled('span', threadEmptyStateStyles.text);
</script>

<template>
  <FlexCenter>
    <Root>
      <Icon weight="regular" :size="32" />
      <Text>Write a comment</Text>
    </Root>
  </FlexCenter>
</template>
