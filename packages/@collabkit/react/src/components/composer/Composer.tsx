import React, { useContext } from 'react';

import { ComposerTarget } from '../../constants';
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { $convertFromMarkdownString } from '@lexical/markdown';
import { TRANSFORMERS, MentionNode, TimestampNode } from '../../editor';
import { TimestampPlugin } from './TimestampPlugin';
import { MentionsPlugin } from './MentionsPlugin';
import { PasteTextPlugin } from './PasteTextPlugin';
import { useApp } from '../../hooks/useApp';
import { useOnMarkdownLinkClick } from '../../hooks/useOnMarkdownLinkClick';
import { composerStyles } from '@collabkit/theme';
import { useThreadContext } from '../../hooks/useThreadContext';
import { TargetContext } from '../Target';
import { useTarget } from '../../hooks/useTarget';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

const initialConfigDefaults = {
  namespace: 'Composer',
  theme: composerStyles.lexicalTheme,
  nodes: [MentionNode, TimestampNode],
  onError,
};

export const ComposerContext = React.createContext<{ body: string }>({ body: '' });

export function Root(props: { className?: string; children: React.ReactNode }) {
  const { threadId, workspaceId, userId } = useThreadContext();
  const { onClick } = useOnMarkdownLinkClick({ threadId, workspaceId, userId, eventId: null });

  const target: ComposerTarget = {
    workspaceId,
    threadId,
    type: 'composer',
  };

  return (
    <div className={props.className} onClick={onClick}>
      <TargetContext.Provider value={target}>{props.children}</TargetContext.Provider>
    </div>
  );
}

export function Content(props: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { events } = useApp();
  const target = useTarget();

  return (
    <div
      className={props.className}
      style={props.style}
      onFocus={(e) => events.onFocus(e, { target })}
      onBlur={(e) => events.onBlur(e, { target })}
    >
      {props.children}
    </div>
  );
}

export function ContentEditable(props: { className?: string; autoFocus?: boolean }) {
  return <LexicalContentEditable className={props.className} tabIndex={props.autoFocus ? 1 : 0} />;
}

export const Editor = function ComposerEditor(props: {
  autoFocus?: boolean;
  placeholder: React.ReactElement;
  className?: string;
  contentEditable: (props: { autoFocus?: boolean }) => JSX.Element;
}) {
  const target = useTarget();
  const { events } = useApp();
  const { body } = useContext(ComposerContext);

  const initialConfig = {
    ...initialConfigDefaults,
    editorState: () => $convertFromMarkdownString(body, TRANSFORMERS),
  };

  return (
    <div className={props.className}>
      <LexicalComposer initialConfig={initialConfig}>
        <div id="mentions" style={{ position: 'absolute', left: 0, right: 0 }} />
        <PasteTextPlugin />
        <PlainTextPlugin
          contentEditable={props.contentEditable({ autoFocus: props.autoFocus })}
          placeholder={props.placeholder}
        />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            events.onComposerChange(target, editorState, editor);
          }}
        />
        <HistoryPlugin />
        <MentionsPlugin />
        <TimestampPlugin />
        {props.autoFocus ? <AutoFocusPlugin /> : ''}
      </LexicalComposer>
    </div>
  );
};
