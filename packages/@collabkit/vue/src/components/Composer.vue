<script setup lang="ts">
import {
  LexicalAutoFocusPlugin,
  LexicalComposer,
  LexicalContentEditable,
  LexicalHistoryPlugin,
  LexicalPlainTextPlugin,
} from 'lexical-vue';
import { MentionNode } from './composer/MentionNode';
import SendButton from './composer/SendButton.vue';
import { composerStyles } from '@collabkit/theme';
import { styled } from './styled';
import type { Profile, Workspace } from '@collabkit/core';

defineProps<{
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  isFloating: boolean;
  workspace: Workspace;
  placeholder: string;
  autoFocus?: boolean;
  hideAvatar?: boolean;
}>();

defineEmits<{
  (e: 'heightChange', height: number): void;
}>();

const StyledContentEditable = styled(LexicalContentEditable, composerStyles.contentEditable);
const Placeholder = styled('div', composerStyles.placeholder);
const ComposerContainer = styled('div', composerStyles.container);
const StyledLexicalEditorContainer = styled('div', composerStyles.editorContainer);
const StyledVisibleComposerArea = styled('div', composerStyles.visibleComposerArea);

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

const config = {
  theme: composerStyles.lexicalTheme,
  onError,
  nodes: [MentionNode],
};

function onFocus() {
  // events.onFocus(e, { target })
}

function onBlur() {
  // events.onBlur(e, { target })
}

const bodyLength = 0;
</script>

<template>
  <ComposerContainer>
    <!-- {props.profile && !props.hideAvatar ? (
        <Avatar style={{ position: 'relative', top: 4, marginLeft: 8 }} profile={props.profile} />
      ) : null} -->
    <LexicalComposer :initial-config="config">
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

          <LexicalHistoryPlugin />
          <LexicalAutoFocusPlugin />
        </StyledVisibleComposerArea>
      </StyledLexicalEditorContainer>
    </LexicalComposer>
    <SendButton :bodyLength="bodyLength" :workspaceId="workspaceId" :threadId="threadId" />
  </ComposerContainer>
</template>
