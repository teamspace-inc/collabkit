import React, { ComponentProps, useContext, useEffect, useState, useCallback, useRef } from 'react';

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
import { vars } from '../../theme/theme/index.css';
import { KeyPlugin } from './KeyPlugin';
import PinButtonSvg from './pin-button.svg';
import PinButtonHoverSvg from './pin-button-hover.svg';
import DeletePinButtonSvg from './delete-pin-button.svg';
import DeletePinButtonHoverSvg from './delete-pin-button-hover.svg';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

import { initComposer } from '../../../../client/src/events';
import { useHovering } from '../../hooks/useHovering';
import { Tooltip } from '../Tooltip';

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
export const ComposerContext = React.createContext<ComposerContextValue>({
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
  return useContext(ComposerContext);
}

function ComposerRoot(props: {
  className?: string;
  children: React.ReactNode;
  autoFocus?: boolean;
  body?: string;
  ['data-testid']?: string;
}) {
  const [context, setContext] = useState<ComposerContextValue>({
    body: props.body ?? '',
    autoFocus: props.autoFocus ?? false,
    canPin: false,
  });

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
      data-testid={props['data-testid'] ?? 'collabkit-composer-root'}
      className={props.className ?? styles.root}
      onClick={onClick}
    >
      <Profile.Provider profileId={userId}>
        <ComposerContext.Provider value={context}>
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
  useEffect(() => {
    return () => events.onBlur(null, { target });
  }, [events.onBlur]);

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
      data-testid="collabkit-composer-mentions-button"
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

type ComposerButtonState =
  | 'pin-default'
  | 'pin-hover'
  | 'pin-selecting'
  | 'empty-default'
  | 'empty-hover'
  | 'empty-selecting';

function ComposerPinButton(props: { className?: string }) {
  const { events, store } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useOptionalCommentContext() ?? { eventId: 'default' };
  const target = { type: 'composerPinButton', threadId, workspaceId, eventId } as const;
  const { pendingPin, uiState } = useSnapshot(store);
  const ref = useRef(null);
  const hover = useHovering(ref);

  const state = ((pendingPin !== null ? 'pin' : 'empty') +
    '-' +
    (uiState === 'selecting' ? 'selecting' : hover ? 'hover' : 'default')) as ComposerButtonState;

  const icons: { [state: string]: React.ReactElement } = {
    'pin-default': <img src={DeletePinButtonSvg} />,
    'pin-hover': <img src={DeletePinButtonHoverSvg} />,
    'pin-selecting': <img src={DeletePinButtonHoverSvg} />,
    'empty-default': <img src={PinButtonSvg} />,
    'empty-hover': <img src={PinButtonHoverSvg} />,
    'empty-selecting': <img src={PinButtonHoverSvg} />,
  };

  const tooltip: { [state: string]: string } = {
    'pin-default': 'Remove pin',
    'pin-hover': 'Remove pin',
    'pin-selecting': 'Remove pin',
    'empty-default': 'Pin',
    'empty-hover': 'Pin',
    'empty-selecting': 'Pin',
  };

  const icon = React.cloneElement(icons[state], {
    style: { position: 'relative', top: '-1px', width: '18px', height: '18px' },
  });

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div
          ref={ref}
          style={{
            padding: '8px',
            background: hover ? vars.color.surfaceHover : 'unset',
            borderTopLeftRadius: '6px',
            borderBottomLeftRadius: '6px',
            border: 'none',
            height: '100%',
          }}
          onClick={(e) => events.onClick(e, { target })}
        >
          {icon}
        </div>
      </Tooltip.Trigger>
      <Tooltip.Content>{tooltip[state]}</Tooltip.Content>
    </Tooltip>
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
      <div style={{ display: 'flex', position: 'relative' }}>
        <Composer.PinButton />
        <LexicalComposer initialConfig={initialConfig}>
          <EditorPlugin onMount={handleChange} />
          <KeyPlugin onKeyDown={(event) => events.onKeyDown(event)} />
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
        {/* <Composer.ButtonGroup>
          <Composer.MentionsButton />
        </Composer.ButtonGroup> */}
      </div>
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
