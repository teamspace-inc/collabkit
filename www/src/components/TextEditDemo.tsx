import { Inbox, LexicalCommentPlugin } from '@collabkit/react';
import { AcmeLogo } from './AcmeLogo';
import * as uiStyles from './UI.css';

import { $getRoot, $getSelection, EditorState } from 'lexical';
import { MarkNode } from '@lexical/mark';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { $setSelection } from 'lexical';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import { CodeNode } from '@lexical/code';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TextNode } from 'lexical';

import { TRANSFORMERS } from '@lexical/markdown';

// Order of text transformers matters:
//
// - code should go first as it prevents any transformations inside
// - then longer tags match (e.g. ** or __ should go before * or _)
const theme = {
  // Theme styling goes here
  // ...
};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    // console.log(root, selection);
  });
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function Editor(props: { body: string }) {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [MarkNode, CodeNode, TextNode, ListNode, ListItemNode, LinkNode, HeadingNode, QuoteNode],
    editorState: () => {
      $convertFromMarkdownString(props.body, TRANSFORMERS);
      $setSelection(null);
    },
  };

  return (
    <div style={{ flex: 1, paddingRight: '100px' }}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable style={{ outline: 'none' }} />}
          placeholder={<div>Enter some text...</div>}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <LexicalCommentPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </LexicalComposer>
    </div>
  );
}

export function TextEditDemo() {
  return (
    <div className={uiStyles.ui}>
      <div>
        <AcmeLogo />
      </div>
      <div>
        <span>online</span> <span>[facepile]</span>
      </div>
      <div className={uiStyles.container}>
        <div className={uiStyles.headingRow}>
          <span className={uiStyles.heading}>Document</span>
        </div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
          }}
        >
          <Editor body={`# Project Plan`} />
          <Inbox />
        </div>
      </div>
    </div>
  );
}
