import React, { ComponentProps, useContext } from 'react';

import { ComposerTarget } from '../../constants';
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { $convertFromMarkdownString, $convertToMarkdownString } from '@lexical/markdown';
import {
  TRANSFORMERS,
  PinNode,
  MentionNode,
  TimestampNode,
  $isMentionNode,
  ComposerPin,
} from '@collabkit/editor';
import { TimestampPlugin } from './TimestampPlugin';
import { MentionsPlugin } from './MentionsPlugin';
import { PasteTextPlugin } from './PasteTextPlugin';
import { useApp } from '../../hooks/useApp';
import { useOnMarkdownLinkClick } from '../../hooks/useOnMarkdownLinkClick';
import { useThreadContext } from '../../hooks/useThreadContext';
import { TargetContext } from '../Target';
import { useTarget } from '../../hooks/useTarget';
import * as styles from '../../theme/components/Composer.css';
import { useOptionalCommentContext } from '../../hooks/useCommentContext';
import { useSnapshot } from 'valtio';
import { $getRoot, $setSelection } from 'lexical';
import { TypingIndicator } from '../TypingIndicator';

import Profile from '../Profile';

import PinButtonSvg from '../../pin-button.svg';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

const initialConfigDefaults = {
  namespace: 'Composer',
  theme: styles.lexicalTheme,
  nodes: [MentionNode, TimestampNode, PinNode],
  onError,
};

export const ComposerContext = React.createContext<{
  body: string;
  autoFocus: boolean;
  canPin: boolean;
}>({
  body: '',
  autoFocus: true,
  canPin: false,
});

function useComposerContext() {
  return useContext(ComposerContext);
}

function ComposerRoot(props: {
  className?: string;
  children: React.ReactNode;
  autoFocus?: boolean;
  body?: string;
  canPin?: boolean;
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
    <div
      data-testid="collabkit-composer-root"
      className={props.className ?? styles.root}
      onClick={onClick}
    >
      <Profile.Provider profileId={userId}>
        <ComposerContext.Provider
          value={{
            body: props.body ?? '',
            autoFocus: props.autoFocus ?? true,
            canPin: props.canPin ?? false,
          }}
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
  const { autoFocus, canPin } = useComposerContext();
  return (
    <div
      data-testid="collabkit-composer-contenteditable"
      style={{ display: 'contents' }}
      onFocus={(e) => events.onFocus(e, { target })}
      onBlur={(e) => events.onBlur(e, { target })}
    >
      {canPin && <Composer.PinButton />}
      <LexicalContentEditable
        className={props.className ?? styles.input({ canPin })}
        tabIndex={autoFocus ? 1 : 0}
      />
    </div>
  );
}
``;

function ComposerPinButton(props: { className?: string }) {
  const { events } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useOptionalCommentContext() ?? { eventId: 'default' };

  return (
    <button
      style={{ zIndex: 999 }}
      data-testid="collabkit-composer-pin-button"
      className={props.className ?? styles.pinButton}
      onClick={(e) =>
        events.onClick(e, { target: { type: 'composerPinButton', threadId, workspaceId, eventId } })
      }
    >
      <img src={PinButtonSvg} />
    </button>
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
      data-testid="collabkit-composer-editor"
      className={props.className ?? `${styles.editor({ active })} ${styles.composerGlobalStyles}`}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <PasteTextPlugin />
        <PlainTextPlugin
          contentEditable={props.contentEditable ?? <Composer.ContentEditable />}
          placeholder={props.placeholder}
          ErrorBoundary={(props) => {
            console.log(props);
            return <>{props.children}</>;
          }}
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
  const { canPin } = useComposerContext();
  return (
    <span
      data-testid="collabkit-composer-placeholder"
      {...props}
      className={props.className ?? styles.placeholder({ canPin })}
    />
  );
}

export default function Composer() {
  const { autoFocus, placeholder } = useThreadContext();
  return (
    <Composer.Root autoFocus={autoFocus ?? true}>
      <Profile.Avatar />
      <Composer.Editor
        contentEditable={<Composer.ContentEditable />}
        placeholder={
          <Composer.Placeholder>{placeholder ?? 'Write a comment'}</Composer.Placeholder>
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
Composer.PinButton = ComposerPinButton;
Composer.Pin = ComposerPin;
