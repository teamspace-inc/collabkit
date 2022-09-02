import React from 'react';
import { ComposerTarget } from '../../constants';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { TimestampPlugin } from './TimestampPlugin';
import { MentionsPlugin } from './MentionsPlugin';
import { PasteTextPlugin } from '../PasteTextPlugin';
import { useApp } from '../../hooks/useApp';
import { useOnMarkdownLinkClick } from '../../hooks/useOnMarkdownLinkClick';
import equal from 'fast-deep-equal';
import { composerStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';

const StyledLexicalEditorContainer = styled('div', composerStyles.lexicalEditorContainer);
const StyledVisibleComposerArea = styled('div', composerStyles.visibleComposerArea);
const StyledContentEditable = styled(ContentEditable, composerStyles.contentEditable);
const Placeholder = styled('div', composerStyles.placeholder);

import { MentionNode } from './MentionNode';
import { TimestampNode } from './TimestampNode';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

export const initialConfig = {
  namespace: 'Composer',
  theme: composerStyles.lexicalTheme,
  nodes: [MentionNode, TimestampNode],
  onError,
};

export const ComposerEditor = React.memo(function ComposerEditor(props: {
  autoFocus?: boolean;
  threadId: string;
  workspaceId: string;
  userId: string;
  placeholder: React.ReactNode | string;
}) {
  const { events } = useApp();
  const target: ComposerTarget = {
    workspaceId: props.workspaceId,
    threadId: props.threadId,
    type: 'composer',
  };

  const { onClick } = useOnMarkdownLinkClick({ ...props, event: null });

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <StyledLexicalEditorContainer
        onClick={onClick}
        onFocus={(e: React.FocusEvent) => events.onFocus(e, { target })}
        onBlur={(e: React.FocusEvent) => events.onBlur(e, { target })}
      >
        <StyledVisibleComposerArea>
          <PasteTextPlugin />
          <PlainTextPlugin
            contentEditable={<StyledContentEditable tabIndex={props.autoFocus ? 1 : undefined} />}
            placeholder={<Placeholder>{props.placeholder}</Placeholder>}
          />
          <OnChangePlugin
            onChange={(editorState, editor) => {
              events.onComposerChange(target, editorState, editor);
            }}
          />
          <HistoryPlugin />
          <MentionsPlugin />
          <TimestampPlugin />
          {props.autoFocus ? <AutoFocusPlugin /> : null}
        </StyledVisibleComposerArea>
      </StyledLexicalEditorContainer>
    </LexicalComposer>
  );
},
equal);
