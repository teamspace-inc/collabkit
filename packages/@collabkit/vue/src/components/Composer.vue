<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import {
  LexicalAutoFocusPlugin,
  LexicalComposer,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalOnChangePlugin,
  LexicalPlainTextPlugin,
} from 'lexical-vue';
import type { EditorState, LexicalEditor } from 'lexical';
import type { Target } from '@collabkit/core';
import { composerStyles } from '@collabkit/theme';
import Avatar from './Avatar.vue';
import { MentionNode } from './composer/MentionNode';
import SendButton from './composer/SendButton.vue';
import Typers from './comment/Typers.vue';
import { styled } from './styled';
import { useStore } from '../composables/useStore';
import { useEvents } from '../composables/useEvents';

const props = defineProps<{
  workspaceId: string;
  threadId: string;
  userId: string;
  isTyping?: { [userId: string]: boolean };
  isFloating: boolean;
  placeholder: string;
  autoFocus?: boolean;
  hideAvatar?: boolean;
}>();

const StyledContentEditable = styled(LexicalContentEditable, composerStyles.contentEditable);
const Placeholder = styled('div', composerStyles.placeholder);
const ComposerContainer = styled('div', composerStyles.container);
const StyledLexicalEditorContainer = styled('divv', composerStyles.editorContainer);
const StyledVisibleComposerArea = styled('div', composerStyles.visibleComposerArea);
const StyledTypingOffset = styled('div', composerStyles.typingOffset);

const store = useStore();
const events = useEvents();

const profile = computed(() => store.profiles[props.userId]);
const composer = computed(() =>
  store.workspaces[props.workspaceId]
    ? store.workspaces[props.workspaceId].composers[props.threadId]
    : null
);
const target = computed(
  (): Target => ({
    type: 'composer',
    threadId: props.threadId,
    workspaceId: props.workspaceId,
  })
);

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

const initialConfig = {
  namespace: 'Composer',
  theme: composerStyles.lexicalTheme,
  nodes: [MentionNode],
  onError,
};

function onFocus(e: FocusEvent) {
  events.onFocus(e, { target: target.value });
}

function onBlur(e: FocusEvent) {
  events.onBlur(e, { target: target.value });
}

function onChange(editorState: EditorState, editor: LexicalEditor) {
  events.onComposerChange(target.value, editorState, editor);
}

const content = ref('');
</script>

<template>
  <ComposerContainer v-if="composer != null">
    <Avatar
      v-if="profile && !hideAvatar"
      :style="{ position: 'relative', top: '4px', marginLeft: '8px' }"
      :profile="profile"
    />
    <LexicalComposer :initial-config="initialConfig">
      <StyledLexicalEditorContainer>
        <StyledVisibleComposerArea>
          <LexicalPlainTextPlugin>
            <template #contentEditable>
              <StyledContentEditable @focus="onFocus" @blur="onBlur" />
            </template>
            <template #placeholder>
              <Placeholder>{{ placeholder }}</Placeholder>
            </template>
          </LexicalPlainTextPlugin>
          <LexicalOnChangePlugin v-model="content" @change="onChange" />
          <LexicalHistoryPlugin />
          <LexicalAutoFocusPlugin v-if="autoFocus" />
        </StyledVisibleComposerArea>
      </StyledLexicalEditorContainer>
    </LexicalComposer>
    <SendButton :bodyLength="content.length" :workspaceId="workspaceId" :threadId="threadId" />
  </ComposerContainer>
  <StyledTypingOffset>
    <Typers :userId="userId" :isTyping="isTyping" />
  </StyledTypingOffset>
</template>
