import React from 'react';

import { Profile, Target, Workspace } from '../constants';
import { EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useRef } from 'react';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import MentionsPlugin from './MentionsPlugin';
import { MentionNode } from './MentionNode';
import { useApp } from '../hooks/useApp';
import { SendButton } from './composer/SendButton';
import { Avatar } from './Avatar';
import { styled } from '@stitches/react';

const lexicalTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function Placeholder(props: { children: React.ReactNode }) {
  return <div className="editor-placeholder">{props.children}</div>;
}

export function createEditorConfig() {
  return {
    namespace: 'Composer',
    theme: lexicalTheme,
    nodes: [MentionNode],
    onError,
  };
}

const ComposerContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flex: '0 1 auto',
  borderBottomLeftRadius: '$radii$1',
  borderBottomRightRadius: '$radii$1',
  padding: '$padding$0 $padding$1',
  background: '$colors$backgroundColor',
});

const StyledLexicalEditorContainer = styled('div', {
  borderRadius: '$radii$0',
  width: 'calc(100% - $padding$composer - $sizes$avatar - 12px)', // take into account send button
  color: '$colors$primaryText',
  marginLeft: 8,
  padding: '0px 0',
  position: 'relative',
  verticalAlign: 'top',
  background: '$colors$composerBackground',

  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',
});

// affects the text rendered inside the composer, so
// there is room for the send
const StyledVisibleComposerArea = styled('div', {
  borderRadius: '$radii$0',
  width: 'calc(100% - $sizes$sendButton - 8px)', // take into account send button
  color: '$colors$primaryText',
  // marginLeft: 8,
  padding: '0px 0',
  position: 'relative',
  verticalAlign: 'top',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$1',
  fontWeight: '$fontWeights$0',
  textAlign: 'left',
});

export function Composer(props: {
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  isFloating: boolean;
  workspace: Workspace;
  placeholder: React.ReactNode | string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  hideAvatar?: boolean;
  onHeightChange?: (height: number) => void;
}) {
  const { events, theme } = useApp();

  const editorStateRef = useRef<EditorState>();

  const target = {
    type: 'composer',
    threadId: props.threadId,
    workspaceId: props.workspaceId,
  } as Target;

  const composer = props.workspace.composers[props.threadId];
  const bodyLength = composer?.$$body.trim().length ?? 0;

  const initialConfig = {
    ...createEditorConfig(),
    editor__DEPRECATED: composer?.editor,
  };

  const editorContainerRef = useRef(null);
  useResizeObserver({
    ref: editorContainerRef,
    onResize: (info) => {
      props.onHeightChange?.(info.height + 7);
    },
  });

  if (!composer) {
    //console.warn('CollabKit: Failed to boot composer');
    return null;
  }

  return (
    <ComposerContainer style={props.style}>
      {props.profile && !props.hideAvatar ? (
        <Avatar style={{ position: 'relative', top: 4, marginLeft: 8 }} profile={props.profile} />
      ) : null}
      <LexicalComposer initialConfig={initialConfig}>
        <StyledLexicalEditorContainer
          className="editor-container"
          ref={editorContainerRef}
          onFocus={(e) => events.onFocus(e, { target })}
          onBlur={(e) => events.onBlur(e, { target })}
        >
          <StyledVisibleComposerArea>
            <style>
              // todo move this to @stitches // copied from
              https://codesandbox.io/s/lexical-plain-text-example-g932e?file=/src/styles.css:554-1383
              {`
.ltr {
  text-align: left;
}

.rtl {
  text-align: right;
}

.editor-input {
  resize: none;
  font-size: ${theme.fontSize[2].toString()};
  line-height: ${theme.lineHeights[0].toString()};
  caret-color: ${theme.colors.neutral12};
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: ${theme.padding[1].toString()} ${theme.padding[1].toString()};
}

.editor-placeholder {
  color: ${theme.colors.secondaryText.toString()};
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: ${theme.padding[1].toString()};
  left:  ${theme.padding[1].toString()};
  font-size: ${theme.fontSize[2].toString()};
  line-height: ${theme.lineHeights[0].toString()};
  user-select: none;
  display: inline-block;
  pointer-events: none;
}

.editor-paragraph {
  margin: 0 0 0px 0;
  position: relative;
}
`}
            </style>
            <PlainTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<Placeholder>{props.placeholder}</Placeholder>}
            />
            <OnChangePlugin
              onChange={(editorState) => {
                editorStateRef.current = editorState;
                events.onComposerChange(target, editorState);
              }}
            />
            <HistoryPlugin />
            <MentionsPlugin />
            {props.autoFocus ? <AutoFocusPlugin /> : null}
          </StyledVisibleComposerArea>
        </StyledLexicalEditorContainer>
      </LexicalComposer>
      <SendButton
        bodyLength={bodyLength}
        workspaceId={props.workspaceId}
        threadId={props.threadId}
      />
    </ComposerContainer>
  );
}
