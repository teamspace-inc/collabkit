import React from 'react';
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
import { actions } from '../actions';

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

const StyledComposerSendButton = styled(Tooltip.Trigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '$sizes$sendButton',
  height: '$sizes$sendButton',
  position: 'absolute',
  right: '$space$2',
  top: '$space$2',
  borderRadius: '$sizes$sendButton',
  border: 'none',

  variants: {
    type: {
      popout: {},
    },
    hasComments: {
      true: {},
      false: {},
    },
    disabled: {
      true: {
        opacity: 0,
        // backgroundColor: '$neutral8',
      },
      false: {
        backgroundColor: '$colors$composerButtonBackground',
      },
    },
  },
  compoundVariants: [
    {
      type: 'popout',
      hasComments: false,
      css: {
        // position: 'unset',
        // top: 'unset',
        // right: 'unset',
        // width: 'auto',
        // color: '$neutral1',
        // fontWeight: 500,
        // fontFamily: 'Inter',
        // gap: '2px',
        // padding: '0px 10px',
        // lineHeight: '24px',
      },
    },
  ],
});

function Placeholder(props: { hasComments: boolean }) {
  return (
    <div className="editor-placeholder">
      {props.hasComments ? 'Reply or add others with @' : 'Add a new comment'}
    </div>
  );
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
  flex: 1,
  alignItems: 'start',
  borderBottomLeftRadius: '$radii$1',
  borderBottomRightRadius: '$radii$1',
  padding: '$padding$0 $padding$1',

  variants: {
    hasComments: {
      true: {
        borderTop: `1px solid $borderColor`,
      },
      false: {
        borderRadius: '$radii$1',
      },
    },
    type: {
      popout: {},
    },
  },
  // compoundVariants: [
  //   {
  //     type: 'popout',
  //     hasComments: false,
  //     css: {
  //       minHeight: 8 * 2 + 20 + 60,
  //     },
  //   },
  // ],
});

const StyledLexicalEditorContainer = styled('div', {
  borderRadius: '$radii$1',
  width: '100%', // take into account send button
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
  variants: {
    type: {
      popout: {
        borderTopLeftRadius: '$radii$1',
        borderTopRightRadius: '$radii$1',
        borderBottomLeftRadius: '$radii$1',
        borderBottomRightRadius: '$radii$1',
      },
    },
    hasComments: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      type: 'popout',
      hasComments: false,
      css: {
        borderTopLeftRadius: '$radii$1',
        borderTopRightRadius: '$radii$1',
        borderBottomLeftRadius: '$radii$1',
        borderBottomRightRadius: '$radii$1',
      },
    },
  ],
});

export function Composer(props: {
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  type: 'popout' | undefined;
  isFloating: boolean;
  workspace: Workspace;
  hasComments: boolean;
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
    <ComposerContainer style={props.style} hasComments={props.hasComments} type={props.type}>
      <LexicalComposer initialConfig={initialConfig}>
        <StyledLexicalEditorContainer
          type={props.type}
          hasComments={props.hasComments}
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
}

#mentions-typeahead ul li.selected {
  background: ${theme.colors.selectionBackground};
  font-weight: ${theme.fontWeights[1].toString()};
  color: white;
}

#mentions-typeahead.bottom_edge {
  transform: translateY(calc(-100% - 36px));
}
`}
          </style>
          <PlainTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder hasComments={props.hasComments} />}
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
          type={props.type}
          hasComments={props.hasComments}
          disabled={bodyLength === 0}
          onClick={(e) => {
            if (bodyLength > 0) {
              events.onSend(props.workspaceId, props.threadId);
            }
          }}
        >
          {props.type === 'popout' && !props.hasComments ? '' : ''}
          <ArrowUp
            size={14}
            color={'white'}
            weight={'bold'}
            style={{ position: 'relative', cursor: 'pointer' }}
          />
        </StyledComposerSendButton>
        <Tooltip.Content>
          Post
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </ComposerContainer>
  );
}
