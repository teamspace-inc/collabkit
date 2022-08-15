import React, { useEffect } from 'react';

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
import { css, styled } from '@stitches/react';
import { initComposer } from '../actions/subscribeThread';

const ltrStyles = css({
  textAlign: 'left',
});
const rtlStyles = css({
  textAlign: 'right',
});
const placeholderStyles = css({
  color: '$colors$secondaryText',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '$padding$1',
  left: '$padding$1',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
});
const editorInputStyles = css({
  resize: 'none',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  caretColor: '$colors$neutral12',
  position: 'relative',
  tabSize: 1,
  outline: 0,
  padding: '$padding$1 $padding$1',
});
const paragraphStyles = css({
  margin: '0 0 0px 0',
  position: 'relative',
});

const lexicalTheme = {
  ltr: ltrStyles.toString(),
  rtl: rtlStyles.toString(),
  placeholder: placeholderStyles.toString(),
  paragraph: paragraphStyles.toString(),
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

const Placeholder = styled('div', placeholderStyles);

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
  const { events, store } = useApp();

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

  // for some reason composer is not booted properly elsewhere
  // so we recover from it here
  useEffect(() => {
    if (!composer) {
      store.workspaces[props.workspaceId].composers[props.threadId] = initComposer();
    }
  }, [composer]);

  if (!composer) {
    return null;
  }

  return (
    <ComposerContainer style={props.style}>
      {props.profile && !props.hideAvatar ? (
        <Avatar style={{ position: 'relative', top: 4, marginLeft: 8 }} profile={props.profile} />
      ) : null}
      <LexicalComposer initialConfig={initialConfig}>
        <StyledLexicalEditorContainer
          ref={editorContainerRef}
          onFocus={(e) => events.onFocus(e, { target })}
          onBlur={(e) => events.onBlur(e, { target })}
        >
          <StyledVisibleComposerArea>
            <PlainTextPlugin
              contentEditable={<ContentEditable className={editorInputStyles.toString()} />}
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
