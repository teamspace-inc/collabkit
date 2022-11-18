import React, { ComponentProps, useContext } from 'react';

import { ComposerTarget } from '../../constants';
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import { TRANSFORMERS, MentionNode, TimestampNode, $isMentionNode } from '../../editor';
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
import { $getRoot, $setSelection } from 'lexical';
import { TypingIndicator } from '../TypingIndicator';

import Profile from '../Profile';

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

export const ComposerContext = React.createContext<{ body: string; autoFocus: boolean }>({
  body: '',
  autoFocus: true,
});

function useComposerContext() {
  return useContext(ComposerContext);
}

function ComposerRoot(props: {
  className?: string;
  children: React.ReactNode;
  autoFocus?: boolean;
  body?: string;
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
      <Profile.Provider profileId={userId}>
        <ComposerContext.Provider
          value={{ body: props.body ?? '', autoFocus: props.autoFocus ?? true }}
        >
          <TargetContext.Provider value={target}>{props.children}</TargetContext.Provider>
        </ComposerContext.Provider>
      </Profile.Provider>
    </div>
  );
}

function ComposerContentEditable(props: { className?: string }) {
  const { events } = useApp();
  const target = useTarget();
  const { autoFocus } = useComposerContext();
  return (
    <div
      style={{ display: 'contents' }}
      onFocus={(e) => events.onFocus(e, { target })}
      onBlur={(e) => events.onBlur(e, { target })}
    >
      <LexicalContentEditable
        className={props.className ?? styles.input()}
        tabIndex={autoFocus ? 1 : 0}
      />
    </div>
  );
}

function ComposerEditor(props: {
  placeholder: React.ReactElement;
  className?: string;
  contentEditable?: JSX.Element;
}) {
  const target = useTarget();
  const { autoFocus } = useComposerContext();
  const { events, store } = useApp();
  const { body } = useContext(ComposerContext);
  const { focusedId } = useSnapshot(store);
  const active = !!(
    focusedId &&
    focusedId.type === 'composer' &&
    target.type === 'composer' &&
    focusedId.threadId === target.threadId &&
    focusedId.eventId === target.eventId
  );

  const initialConfig = {
    ...initialConfigDefaults,
    editorState: () => {
      $convertFromMarkdownString(body, TRANSFORMERS);
      $setSelection(null);
    },
  };

  return (
    <div
      className={props.className ?? `${styles.editor({ active })} ${styles.composerGlobalStyles}`}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <PasteTextPlugin />
        <PlainTextPlugin
          contentEditable={props.contentEditable ?? <Composer.ContentEditable />}
          placeholder={props.placeholder}
        />
        <OnChangePlugin
          onChange={(editorState, editor) => {
            editorState.read(() => {
              const newBody = $convertToMarkdownString(TRANSFORMERS);
              const mentions = $getRoot()
                .getAllTextNodes()
                .filter((node) => $isMentionNode(node))
                .map((node) => node.__id)
                .filter((id) => typeof id === 'string');
              events.onComposerChange(target, editor, newBody, mentions);
            });
          }}
        />
        {autoFocus ? <AutoFocusPlugin /> : <></>}
        <HistoryPlugin />
        <MentionsPlugin />
        <TimestampPlugin />
      </LexicalComposer>
    </div>
  );
}

function ComposerPlaceholder(props: ComponentProps<'span'>) {
  return <span {...props} className={props.className ?? styles.placeholder} />;
}

export default function Composer(props: { placeholder?: string }) {
  const { autoFocus } = useThreadContext();
  return (
    <Composer.Root autoFocus={autoFocus ?? true}>
      <Profile.Avatar />
      <Composer.Editor
        contentEditable={<Composer.ContentEditable />}
        placeholder={
          <Composer.Placeholder>{props.placeholder ?? 'Write a comment'}</Composer.Placeholder>
        }
      />
      <Composer.TypingIndicator />
    </Composer.Root>
  );
}

Composer.Root = ComposerRoot;
Composer.ContentEditable = ComposerContentEditable;
Composer.Editor = ComposerEditor;
Composer.Placeholder = ComposerPlaceholder;
Composer.TypingIndicator = TypingIndicator;
