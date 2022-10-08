import React, { ComponentProps, useContext } from 'react';

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
import * as styles from '../../styles/components/Composer.css';
import { useOptionalCommentContext } from '../../hooks/useCommentContext';
import { useSnapshot } from 'valtio';

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

export const Root = function ComposerRoot(props: {
  className?: string;
  children: React.ReactNode;
}) {
  const commentContext = useOptionalCommentContext();

  const { threadId, workspaceId, userId } = useThreadContext();
  const eventId = commentContext?.eventId ?? 'default';

  const { onClick } = useOnMarkdownLinkClick({ threadId, workspaceId, userId, eventId });

  const target: ComposerTarget = {
    workspaceId,
    threadId,
    type: 'composer',
    eventId,
  };

  return (
    <div className={props.className ?? styles.root} onClick={onClick}>
      <TargetContext.Provider value={target}>{props.children}</TargetContext.Provider>
    </div>
  );
};

export const ContentEditable = function ComposerContentEditable(props: {
  className?: string;
  autoFocus?: boolean;
}) {
  const { events } = useApp();
  const target = useTarget();
  return (
    <div
      style={{ display: 'contents' }}
      onFocus={(e) => events.onFocus(e, { target })}
      onBlur={(e) => events.onBlur(e, { target })}
    >
      <LexicalContentEditable
        className={props.className ?? styles.contentEditable()}
        tabIndex={props.autoFocus ? 1 : 0}
      />
    </div>
  );
};

export const Editor = function ComposerEditor(props: {
  autoFocus?: boolean;
  placeholder: React.ReactElement;
  className?: string;
  contentEditable: (props: { autoFocus?: boolean }) => JSX.Element;
}) {
  const target = useTarget();
  const { events, store } = useApp();
  const { body } = useContext(ComposerContext);
  const { focusedId, hoveringId } = useSnapshot(store);
  const active = !!(
    focusedId &&
    focusedId.type === 'composer' &&
    target.type === 'composer' &&
    focusedId.threadId === target.threadId &&
    focusedId.eventId === target.eventId
  );

  const initialConfig = {
    ...initialConfigDefaults,
    editorState: () => $convertFromMarkdownString(body, TRANSFORMERS),
  };

  return (
    <div
      className={props.className ?? `${styles.editor({ active })} ${styles.composerGlobalStyles}`}
    >
      <LexicalComposer initialConfig={initialConfig}>
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

export const Placeholder = function ComposerPlaceholder(props: ComponentProps<'span'>) {
  return <span {...props} className={props.className ?? styles.placeholder} />;
};
