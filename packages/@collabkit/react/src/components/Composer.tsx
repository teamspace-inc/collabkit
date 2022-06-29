import { ArrowUp } from 'phosphor-react';
import * as Tooltip from './Tooltip';
import { Profile, Store, Target, Workspace } from '../constants';
import { styled, theme } from './UIKit';

import { EditorState, $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useRef } from 'react';
import { useResizeObserver } from '../hooks/useResizeObserver';

import MentionsPlugin from './MentionsPlugin';
import { MentionNode } from './MentionNode';
import { useApp } from './App';

function onChange(store: Store, target: Target, editorState: EditorState) {
  if (target.type === 'composer') {
    editorState.read(() => {
      store.workspaces[target.workspaceId].composers[target.threadId].$$body =
        $getRoot().getTextContent(false) ?? '';
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

const StyledComposerSendButton = styled(Tooltip.Trigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: 24,
  height: 24,
  position: 'absolute',
  right: 10,
  top: 11,
  borderRadius: 24,
  border: 'none',

  variants: {
    disabled: {
      true: {
        backgroundColor: '$neutral8',
      },
      false: {
        backgroundColor: '$accent10',
      },
    },
  },
});

function Placeholder() {
  return <div className="editor-placeholder">Write a comment...</div>;
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
  minHeight: 8 * 2 + 20, // default composer height
  position: 'relative',
  display: 'flex',
  flex: 0,
  alignItems: 'start',
  background: '$neutral1',
  borderBottomLeftRadius: 11,
  borderBottomRightRadius: 11,
  borderTop: `1px solid $neutral6`,
});

const StyledLexicalEditorContainer = styled('div', {
  borderRadius: 6,
  width: 'calc(100% - 35px)', // take into account send button
  color: 'black',
  marginLeft: 0,
  borderBottomLeftRadius: 11,
  borderBottomRightRadius: 11,
  padding: '4px 0',
  background: '$neutral1',
  position: 'relative',
  verticalAlign: 'top',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 400,
  textAlign: 'left',
});

export function Composer(props: {
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  isFloating: boolean;
  workspace: Workspace;
  style?: React.CSSProperties;
  onHeightChange: (height: number) => void;
}) {
  const { events, store } = useApp();
  if (!events || !store) {
    return null;
  }

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
      props.onHeightChange(info.height + 7);
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
  font-size: 14px;
  caret-color: ${theme.colors.neutral12};
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: 10px 12px;
}

.editor-placeholder {
  color: ${theme.colors.neutral10};
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 14px;
  left: 12px;
  font-size: 14px;
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
  background: ${theme.colors.neutral1};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  z-index: 3;
  margin: 0 0 0 10px;
}

#mentions-typeahead ul {
  padding: 0;
  list-style: none;
  margin: 0;
  border-radius: 8px;
}

#mentions-typeahead ul li {
  padding: 6px 10px;
  margin: 0;
  min-width: 10ch;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  border-radius: 6px;
}

#mentions-typeahead ul li.selected {
  background: ${theme.colors.accent10};
  font-weight: 500;
  color: white;
}

#mentions-typeahead.bottom_edge {
  transform: translateY(calc(-100% - 36px));
}
`}
          </style>
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <OnChangePlugin
            onChange={(editorState) => {
              editorStateRef.current = editorState;
              onChange(store, target, editorState);
            }}
          />
          <HistoryPlugin />
          <MentionsPlugin />
        </StyledLexicalEditorContainer>
      </LexicalComposer>
      <Tooltip.Root>
        <StyledComposerSendButton
          disabled={bodyLength === 0}
          onClick={(e) => {
            if (bodyLength > 0) {
              events.onSend(props.workspaceId, props.threadId);
            }
          }}
        >
          <ArrowUp
            size={14}
            color={'white'}
            weight={'bold'}
            style={{ position: 'relative', cursor: 'pointer' }}
          />
        </StyledComposerSendButton>
        <Tooltip.Content>
          Send
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </ComposerContainer>
  );
}
