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
import { styled } from '../styled';
import { useEvents } from '../../composables/useEvents';

const props = defineProps<{
  placeholder: string;
  autoFocus?: boolean;
  target: Target;
}>();

const StyledContentEditable = styled(LexicalContentEditable, composerStyles.contentEditable);
const Placeholder = styled('div', composerStyles.placeholder);
const Root = styled('div', composerStyles.editorRoot);
const Content = styled('div', composerStyles.content);

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
  nodes: [],
  onError,
};

function onFocus(e: FocusEvent) {
  events.onFocus(e, { target: props.target });
}

function onBlur(e: FocusEvent) {
  events.onBlur(e, { target: props.target });
}

function onChange(editorState: EditorState, editor: LexicalEditor) {
  // @ts-expect-error this fails until lexical-vue is updated to a version that uses lexical@4
  events.onComposerChange(props.target, editorState, editor);
}

const content = ref('');

defineExpose({
  content,
});
</script>

<template>
  <LexicalComposer :initial-config="initialConfig">
    <Root>
      <div id="#mentions" :style="{ position: 'relative' }"></div>
      <Content>
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
      </Content>
    </Root>
  </LexicalComposer>
</template>
