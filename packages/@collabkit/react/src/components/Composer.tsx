import React from 'react';

import { Target } from '../constants';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useRef } from 'react';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';

import MentionsPlugin from './composer/MentionsPlugin';
import { MentionNode } from './composer/MentionNode';
import TimestampPlugin from './composer/TimestampPlugin';
import { TimestampNode } from './composer/TimestampNode';
import { useApp } from '../hooks/useApp';
import { SendButton } from './composer/SendButton';
import { Avatar } from './Avatar';
import { styled } from '@stitches/react';
import { composerStyles } from '@collabkit/theme';
import { useSnapshot } from 'valtio';
import PasteTextPlugin from './PasteTextPlugin';
import { Typers } from './comment/Typers';

const StyledContentEditable = styled(ContentEditable, composerStyles.contentEditable);
const Placeholder = styled('div', composerStyles.placeholder);
const ComposerContainer = styled('div', composerStyles.container);
const StyledLexicalEditorContainer = styled('div', composerStyles.editorContainer);
const StyledVisibleComposerArea = styled('div', composerStyles.visibleComposerArea);
const StyledTypingOffset = styled('div', composerStyles.typingOffset);

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

const initialConfig = {
  namespace: 'Composer',
  theme: composerStyles.lexicalTheme,
  nodes: [MentionNode, TimestampNode],
  onError,
};

export function Composer(props: {
  workspaceId: string;
  threadId: string;
  userId: string;
  isTyping?: { [userId: string]: boolean };
  isFloating: boolean;
  placeholder: React.ReactNode | string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  hideAvatar?: boolean;
  onHeightChange?: (height: number) => void;
}) {
  const { events, store } = useApp();

  const { userId, profiles, workspaces } = useSnapshot(store);
  const profile = userId ? profiles[userId] : null;
  const workspace = props.workspaceId ? workspaces[props.workspaceId] : null;

  const target = {
    type: 'composer',
    threadId: props.threadId,
    workspaceId: props.workspaceId,
  } as Target;

  const composer = workspace ? workspace.composers[props.threadId] : null;
  const bodyLength = composer?.$$body.trim().length ?? 0;

  const editorContainerRef = useRef(null);
  useResizeObserver({
    ref: editorContainerRef,
    onResize: (info) => {
      props.onHeightChange?.(info.height + 7);
    },
  });

  if (!composer) {
    return null;
  }

  return (
    <div>
      <ComposerContainer style={props.style}>
        {profile && !props.hideAvatar ? (
          <Avatar style={{ position: 'relative', top: 4, marginLeft: 8 }} profile={profile} />
        ) : null}
        <LexicalComposer initialConfig={initialConfig}>
          <StyledLexicalEditorContainer
            ref={editorContainerRef}
            onFocus={(e) => events.onFocus(e, { target })}
            onBlur={(e) => events.onBlur(e, { target })}
          >
            <StyledVisibleComposerArea>
              <PasteTextPlugin />
              <PlainTextPlugin
                contentEditable={<StyledContentEditable />}
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
        <SendButton
          bodyLength={bodyLength}
          workspaceId={props.workspaceId}
          threadId={props.threadId}
        />
      </ComposerContainer>
      <StyledTypingOffset>
        <Typers userId={props.userId} isTyping={props.isTyping} />
      </StyledTypingOffset>
    </div>
  );
}
