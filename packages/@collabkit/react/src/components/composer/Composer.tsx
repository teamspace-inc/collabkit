import React, { ComponentProps, useCallback } from 'react';

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
  InlineTextNode,
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
import { $getRoot, $setSelection, EditorState, LexicalEditor } from 'lexical';
import { TypingIndicator } from '../TypingIndicator';

import Profile from '../Profile';

import { IconButton } from '../IconButton';
import { EditorPlugin } from './EditorPlugin';
import { At } from '../icons';
import { MapPin } from 'phosphor-react';
import { vars } from '../../theme/theme/index.css';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

import { proxy } from 'valtio';
import { initComposer } from '../../../../client/src/events';

type ComposerContextValue = {
  body: string;
  autoFocus: boolean;
  canPin: boolean;
};

// you can use valtio instead of React context for
// more performant and usable context updates
// retaining the context naming so it's clear
// when where using the global store or one local to a
// tree of components
export const ComposerContext = proxy<ComposerContextValue>({
  body: '',
  autoFocus: true,
  canPin: false,
});

function onError(error: any) {
  console.error(error);
}

const initialConfigDefaults = {
  namespace: 'Composer',
  theme: styles.lexicalTheme,
  nodes: [MentionNode, TimestampNode, PinNode, InlineTextNode],
  onError,
};

function useComposerContext() {
  return useSnapshot(ComposerContext);
}

function ComposerRoot(props: {
  className?: string;
  children: React.ReactNode;
  autoFocus?: boolean;
  body?: string;
}) {
  ComposerContext.body = props.body ?? '';
  ComposerContext.autoFocus = props.autoFocus ?? false;

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

  const { store } = useApp();
  initComposer(store, target);

  return (
    <div
      data-testid="collabkit-composer-root"
      className={props.className ?? styles.root}
      onClick={onClick}
    >
      <Profile.Provider profileId={userId}>
        <TargetContext.Provider value={target}>{props.children}</TargetContext.Provider>
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

function ComposerMentionsButton(props: { className?: string }) {
  const { store, events } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useOptionalCommentContext() ?? { eventId: 'default' };
  const target = { type: 'composerMentionsButton', threadId, workspaceId, eventId } as const;
  const { workspaces } = useSnapshot(store);
  const composers = workspaces[workspaceId].composers;
  const composer = composers[threadId][eventId];
  const { isMentioning } = composer;

  return (
    <IconButton
      active={isMentioning}
      style={{ zIndex: 999 }}
      weight="regular"
      color={isMentioning ? vars.color.icon : vars.color.iconSecondary}
      className={props.className}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        events.onClick(e, { target });
      }}
    >
      <At />
    </IconButton>
  );
}

function ComposerPinButton(props: { className?: string }) {
  const { events } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useOptionalCommentContext() ?? { eventId: 'default' };
  const target = { type: 'composerPinButton', threadId, workspaceId, eventId } as const;

  return (
    <IconButton
      active={false}
      style={{ zIndex: 999 }}
      className={props.className}
      weight="regular"
      color={vars.color.iconSecondary}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        events.onClick(e, { target });
      }}
    >
      <MapPin />
    </IconButton>
  );
}

function ComposerEditor(props: {
  placeholder: React.ReactElement;
  className?: string;
  contentEditable?: JSX.Element;
}) {
  const target = useTarget();
  const { workspaceId, threadId } = useThreadContext();
  const { eventId } = useOptionalCommentContext() ?? { eventId: 'default' };
  const { autoFocus, body } = useComposerContext();
  const { events, store } = useApp();
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

  const handleChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      editorState.read(() => {
        const newBody = $convertToMarkdownString(TRANSFORMERS);
        const mentions = $getRoot()
          .getAllTextNodes()
          .filter((node) => $isMentionNode(node))
          .map((node) => node.__id)
          .filter((id) => typeof id === 'string');
        events.onComposerChange(target, editor, newBody, mentions);
      });
    },
    [events.onComposerChange, target]
  );

  return (
    <div
      data-testid="collabkit-composer-editor"
      className={props.className ?? `${styles.editor({ active })} ${styles.composerGlobalStyles}`}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <EditorPlugin onMount={handleChange} />
        <PasteTextPlugin />
        <PlainTextPlugin
          contentEditable={props.contentEditable ?? <Composer.ContentEditable />}
          placeholder={props.placeholder}
          ErrorBoundary={(props) => {
            return <>{props.children}</>;
          }}
        />
        <OnChangePlugin onChange={handleChange} />
        {autoFocus ? <AutoFocusPlugin /> : <></>}
        <HistoryPlugin />
        <MentionsPlugin
          onOpenChange={(open) => {
            store.workspaces[workspaceId].composers[threadId][eventId].isMentioning = open;
          }}
        />
        <TimestampPlugin />
      </LexicalComposer>
      <Composer.ButtonGroup>
        {/* <Composer.PinButton /> */}
        <Composer.MentionsButton />
      </Composer.ButtonGroup>
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

function ComposerButtonGroup(props: { className?: string; children: React.ReactNode }) {
  return <div className={props.className ?? styles.buttonGroup}>{props.children}</div>;
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

Composer.ButtonGroup = ComposerButtonGroup;
Composer.MentionsButton = ComposerMentionsButton;
Composer.PinButton = ComposerPinButton;
Composer.Pin = ComposerPin;
