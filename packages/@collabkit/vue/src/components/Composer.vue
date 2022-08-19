<script setup lang="ts">
import { computed, markRaw, ref, watch, watchEffect } from 'vue';
import {
  LexicalAutoFocusPlugin,
  LexicalComposer,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalOnChangePlugin,
  LexicalPlainTextPlugin,
} from 'lexical-vue';
import { createEditor, type EditorState } from 'lexical';
import type { Profile, Target, Workspace } from '@collabkit/core';
import { composerStyles } from '@collabkit/theme';
import Avatar from './Avatar.vue';
import { MentionNode } from './composer/MentionNode';
import SendButton from './composer/SendButton.vue';
import { styled } from './styled';
import { useStore } from '../composables/useStore';
import { useEvents } from '../composables/useEvents';

const props = defineProps<{
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  isFloating: boolean;
  workspace: Workspace;
  placeholder: string;
  autoFocus?: boolean;
  hideAvatar?: boolean;
}>();

const StyledContentEditable = styled(LexicalContentEditable, composerStyles.contentEditable);
const Placeholder = styled('div', composerStyles.placeholder);
const ComposerContainer = styled('div', composerStyles.container);
const StyledLexicalEditorContainer = styled('div', composerStyles.editorContainer);
const StyledVisibleComposerArea = styled('div', composerStyles.visibleComposerArea);

const store = useStore();
const composer = computed(() =>
  store.workspaces[props.workspaceId]
    ? store.workspaces[props.workspaceId].composers[props.threadId]
    : null
);
watchEffect(() => {
  if (composer.value == null && store.workspaces[props.workspaceId]) {
    store.workspaces[props.workspaceId].composers[props.threadId] = initComposer();
  }
});

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function initComposer() {
  return {
    editor: markRaw(createEditor(createEditorConfig())),
    $$body: '',
    isTyping: {},
  };
}

function createEditorConfig() {
  return {
    namespace: 'Composer',
    theme: composerStyles.lexicalTheme,
    nodes: [MentionNode],
    onError,
  };
}

function onFocus() {
  // events.onFocus(e, { target })
}

function onBlur() {
  // events.onBlur(e, { target })
}

const events = useEvents();

const target = computed(
  (): Target => ({
    type: 'composer',
    threadId: props.threadId,
    workspaceId: props.workspaceId,
  })
);

function onChange(editorState: EditorState) {
  events.onComposerChange(target.value, editorState);
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
    <LexicalComposer :initial-config="createEditorConfig()">
      <StyledLexicalEditorContainer @focus="onFocus" @blur="onBlur">
        <StyledVisibleComposerArea>
          <LexicalPlainTextPlugin>
            <template #contentEditable>
              <StyledContentEditable />
            </template>
            <template #placeholder>
              <Placeholder>{{ placeholder }}</Placeholder>
            </template>
          </LexicalPlainTextPlugin>
          <LexicalOnChangePlugin v-model="content" @change="onChange" />
          <LexicalHistoryPlugin />
          <LexicalAutoFocusPlugin />
        </StyledVisibleComposerArea>
      </StyledLexicalEditorContainer>
    </LexicalComposer>
    <SendButton :bodyLength="content.length" :workspaceId="workspaceId" :threadId="threadId" />
  </ComposerContainer>
</template>
