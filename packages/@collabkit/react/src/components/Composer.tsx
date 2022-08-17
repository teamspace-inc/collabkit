import React, { useEffect } from 'react';

import { Profile, Target } from '../constants';
import { EditorState, LexicalEditor } from 'lexical';
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
import { initComposer } from '../actions/subscribeThread';
import { composerStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';

const StyledContentEditable = styled(ContentEditable, composerStyles.contentEditable);
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

export function createEditorConfig() {
  return {
    namespace: 'Composer',
    theme: composerStyles.lexicalTheme,
    nodes: [MentionNode],
    onError,
  };
}

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export function Composer(props: {
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  isFloating: boolean;
  placeholder: React.ReactNode | string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  hideAvatar?: boolean;
  onHeightChange?: (height: number) => void;
}) {
  const { events, store } = useApp();

  const { workspaces } = useSnapshot(store);
  const workspace = props.workspaceId ? workspaces[props.workspaceId] : null;

  const editorStateRef = useRef<EditorState>();

  const target = {
    type: 'composer',
    threadId: props.threadId,
    workspaceId: props.workspaceId,
  } as Target;

  const composer = workspace ? workspace.composers[props.threadId] : null;
  const bodyLength = composer?.$$body.trim().length ?? 0;

  const initialConfig = {
    ...createEditorConfig(),
    editor__DEPRECATED: composer?.editor as LexicalEditor,
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
              contentEditable={<StyledContentEditable />}
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
