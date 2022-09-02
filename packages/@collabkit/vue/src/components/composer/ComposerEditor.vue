<script setup lang="ts">
import { ref } from 'vue';
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
import { MentionNode } from './MentionNode';
import { styled } from '../styled';
import { useEvents } from '../../composables/useEvents';

const props = defineProps<{
  placeholder: string;
  autoFocus?: boolean;
  hideAvatar?: boolean;
  target: Target;
}>();

const StyledContentEditable = styled(LexicalContentEditable, composerStyles.contentEditable);
const Placeholder = styled('div', composerStyles.placeholder);
const StyledLexicalEditorContainer = styled('div', composerStyles.lexicalEditorContainer);
const StyledVisibleComposerArea = styled('div', composerStyles.visibleComposerArea);

const events = useEvents();

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

const { target } = props;

function onFocus(e: FocusEvent) {
  events.onFocus(e, { target });
}

function onBlur(e: FocusEvent) {
  events.onBlur(e, { target });
}

function onChange(editorState: EditorState, editor: LexicalEditor) {
  events.onComposerChange(target, editorState, editor);
}

const content = ref('');

defineExpose({
  content,
});
</script>

<template>
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
</template>
