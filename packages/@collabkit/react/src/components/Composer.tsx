import React from 'react';

import { Profile, Store, Target, Workspace } from '../constants';
import { styled } from './UIKit';
import { EditorState, $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useRef } from 'react';
import { useResizeObserver } from '../hooks/useResizeObserver';

// import MentionsPlugin from './MentionsPlugin';
import { MentionNode } from './MentionNode';
import { useApp } from '../hooks/useApp';
import { actions } from '../actions';
import { SendButton } from './composer/SendButton';

function onChange(store: Store, target: Target, editorState: EditorState) {
  if (target.type === 'composer') {
    editorState.read(() => {
      const newBody = $getRoot().getTextContent(false) ?? '';
      const body = store.workspaces[target.workspaceId].composers[target.threadId].$$body;

      store.workspaces[target.workspaceId].composers[target.threadId].$$body = newBody;
      if (newBody.length === 0) {
        actions.stopTyping(store, { target });
        actions.isTyping.cancel();
      } else if (newBody.length !== body.length) {
        actions.isTyping(store, { target });
      }
    });
  }
}

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
  background: '$neutral1',
});

const StyledLexicalEditorContainer = styled('div', {
  borderRadius: '$radii$1',
  width: 'calc(100% - $sizes$sendButton - $padding$composer)', // take into account send button
  color: '$colors$primaryText',
  marginLeft: 0,
  padding: '0px 0',
  background: '$colors$composerBackground',
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
  onHeightChange?: (height: number) => void;
}) {
  const { events, store, theme } = useApp();

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
    console.debug('CollabKit: Failed to boot composer');
    return null;
  }

  return (
    <ComposerContainer style={props.style}>
      <LexicalComposer initialConfig={initialConfig}>
        <StyledLexicalEditorContainer
          className="editor-container"
          ref={editorContainerRef}
          onFocus={(e) => events.onFocus(e, { target })}
          onBlur={(e) => events.onBlur(e, { target })}
        >
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

#mentions-typeahead {
  position: fixed;
  background: ${theme.colors.neutral12};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: ${theme.radii[1].toString()};
  z-index: 3;
  margin: 0 0 0  ${theme.padding[1].toString()};
}

#mentions-typeahead ul {
  padding: 0;
  list-style: none;
  margin: 0;
  border-radius: ${theme.radii[1].toString()};
}

#mentions-typeahead ul li {
  padding: ${theme.padding[0].toString()} ${theme.padding[1].toString()};
  margin: 0;
  min-width: 10ch;
  font-size: ${theme.fontSize[2].toString()};
  line-height: ${theme.lineHeights[0].toString()};
  outline: none;
  cursor: pointer;
  border-radius: ${theme.radii[1].toString()};
  color: ${theme.colors.neutral6.toString()};
}

#mentions-typeahead ul li.selected {
  background: ${theme.colors.selectionBackground};
  font-weight: ${theme.fontWeights[1].toString()};
  color: ${theme.colors.neutral1.toString()};
}

#mentions-typeahead.bottom_edge {
  transform: translateY(calc(-100% - 36px));
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
              onChange(store, target, editorState);
            }}
          />
          <HistoryPlugin />
          {/* <MentionsPlugin /> */}
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
