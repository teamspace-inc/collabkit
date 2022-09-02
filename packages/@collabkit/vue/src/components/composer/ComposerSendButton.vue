<script setup lang="ts">
import { ArrowUp } from '../icons';

import { sendButtonStyles } from '@collabkit/theme';
import { styled } from '../styled';
import { inject } from 'vue';
import { ThemeKey } from '../../constants';
import { useEvents } from '../../composables/useEvents';
import type { ProvidedTheme } from '../../types';

const props = defineProps<{
  bodyLength: number;
  workspaceId: string;
  threadId: string;
  type: 'icon' | 'text';
}>();

const StyledComposerSendButton = styled('div', sendButtonStyles.button);
const StyledComposerSendButtonIcon = styled(ArrowUp, sendButtonStyles.icon);

const theme = inject<ProvidedTheme>(ThemeKey)!;
const events = useEvents();

function onClick() {
  if (props.bodyLength > 0) {
    events.onSend(props.workspaceId, props.threadId);
  }
}
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'flex-start', marginTop: '6px' }">
    <StyledComposerSendButton
      :disabled="bodyLength === 0"
      @click="onClick"
      title="Send"
      :type="props.type"
    >
      <StyledComposerSendButtonIcon
        v-if="type === 'icon'"
        :size="13"
        :color="theme.colors.composerButtonIconColor.toString()"
        weight="bold"
      />
      <span v-if="type === 'text'">Comment</span>
    </StyledComposerSendButton>
  </div>
</template>
