import { ArrowUp } from 'phosphor-react';
import * as Tooltip from './Tooltip';
import { Profile, Target, Workspace } from '../constants';
import { Avatar } from './Avatar';
import { blue, mauve, sand } from '@radix-ui/colors';
import { styled } from '@stitches/react';
import { events } from '../events';

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

function onChange(target: Target, editorState: EditorState) {
  editorState.read(() => {
    console.log('editorState', target, $getRoot().getTextContent(false));
  });
}

const theme = {
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

const ACCENT = blue.blue10;

const StyledComposerSendButton = styled(Tooltip.Trigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: ACCENT,

  width: 26,
  height: 26,
  position: 'absolute',
  right: 12,
  top: 12,
  borderRadius: 25,
  border: 'none',

  variants: {
    disabled: {
      true: {
        backgroundColor: mauve.mauve8,
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
    theme,
    nodes: [MentionNode],
    onError,
  };
}

export function Composer(props: {
  profile?: Profile;
  workspaceId: string;
  threadId: string;
  isFloating: boolean;
  workspace: Workspace;
  onHeightChange: (height: number) => void;
}) {
  const editorStateRef = useRef<EditorState>();

  const target = {
    type: 'composer',
    threadId: props.threadId,
    workspaceId: props.workspaceId,
  } as Target;

  const composer = props.workspace.composers[props.threadId];

  const bodyLength =
    composer?.editor
      .getEditorState()
      .read(() => {
        return $getRoot().getTextContent(false);
      })
      .trim().length ?? 0;

  const initialConfig = {
    ...createEditorConfig(),
    editor__DEPRECATED: composer?.editor,
  };

  const editorContainerRef = useRef(null);
  useResizeObserver({
    ref: editorContainerRef,
    onResize: (info) => {
      props.onHeightChange(info.height);
    },
  });

  if (!composer) {
    console.warn('no ocmposer');
    return null;
  }

  return (
    <div
      style={{
        minHeight: 48,
        position: 'relative',
        display: 'flex',
        flex: 0,
        alignItems: 'start',
        borderTop: `1px solid ${sand.sand5}`,
      }}
    >
      {props.profile ? (
        <Avatar profile={props.profile} style={{ position: 'absolute', left: 10, top: 13 }} />
      ) : null}
      <LexicalComposer initialConfig={initialConfig}>
        <div
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

.editor-container {
  border-radius: 2px;
  width: 100%;
  color: #000;
  margin-left: 32px;
  position: relative;
  vertical-align: top;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
}

.editor-input {
  resize: none;
  font-size: 15px;
  caret-color: rgb(5, 5, 5);
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: 15px 10px;
  caret-color: #444;
}

.editor-placeholder {
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
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
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  z-index: 3;
}

#mentions-typeahead ul {
  padding: 0;
  list-style: none;
  margin: 0;
  border-radius: 8px;
}

#mentions-typeahead ul li {
  padding: 10px 15px;
  margin: 0;
  min-width: 180px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  border-radius: 8px;
}

#mentions-typeahead ul li.selected {
  background: #eee;
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
              onChange(target, editorState);
            }}
          />
          <HistoryPlugin />
          <MentionsPlugin />
        </div>
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
    </div>
  );
}
