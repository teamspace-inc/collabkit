<script setup lang="ts">
// @ts-ignore
import PhArrowUp from 'phosphor-vue/dist/esm/components/PhArrowUp.vue';

import { sendButtonStyles, type Theme } from '@collabkit/theme';
import { styled } from '../styled';
import { inject } from 'vue';
import { ThemeKey } from '../../constants';

const props = defineProps<{
  bodyLength: number;
  workspaceId: string;
  threadId: string;
}>();

const StyledComposerSendButton = styled('button', sendButtonStyles.button);
const StyledComposerSendButtonIcon = styled(PhArrowUp, sendButtonStyles.icon);

const theme = inject<Theme>(ThemeKey)!;

function onClick() {
  if (props.bodyLength > 0) {
    //events.onSend(workspaceId, threadId);
  }
}

console.log(theme.colors.composerButtonIconColor.toString());
</script>

<template>
  <StyledComposerSendButton :disabled="bodyLength === 0" @click="onClick" title="Post">
    <StyledComposerSendButtonIcon
      :size="13"
      :color="theme.colors.composerButtonIconColor.toString()"
      weight="bold"
    />
  </StyledComposerSendButton>
</template>
