import React, { ComponentProps, useContext, useEffect, useState, useCallback, useRef } from 'react';

import { ComposerTarget } from '../../constants';
import { ContentEditable as LexicalContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { $convertFromMarkdownString } from '@lexical/markdown';
import {
  TRANSFORMERS,
  PinNode,
  MentionNode,
  TimestampNode,
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
import { ComposerTypingIndicator } from '../TypingIndicator';

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

import { useHovering } from '../../hooks/useHovering';
import { Tooltip } from '../Tooltip';
import { actions } from '@collabkit/client';
import { ComposerPinButtonTarget } from '@collabkit/core';

type ComposerContextValue = {
  initialBody: string;
  autoFocus: boolean;
  canPin: boolean;
  hasText: boolean;
  setHasText: (hasText: boolean) => void;
};

// you can use valtio instead of React context for
// more performant and usable context updates
// retaining the context naming so it's clear
// when where using the global store or one local to a
// tree of components
export const ComposerContext = React.createContext<ComposerContextValue>({
  initialBody: '',
  autoFocus: true,
  canPin: false,
  hasText: false,
  setHasText: () => {},
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
  initialBody?: string;
  ['data-testid']?: string;
}) {
  const [hasText, setHasText] = useState(() =>
    props.initialBody ? props.initialBody.length > 0 : false
  );

  const [context, setContext] = useState<ComposerContextValue>({
    initialBody: props.initialBody ?? '',
    autoFocus: props.autoFocus ?? false,
    canPin: false,
    hasText,
    setHasText,
  });

  useEffect(() => {
    setContext({
      initialBody: props.initialBody ?? '',
      autoFocus: props.autoFocus ?? false,
      canPin: false,
      hasText,
      setHasText,
    });
  }, [hasText, props.initialBody, props.autoFocus]);

  const eventId = useOptionalCommentContext() ?? 'default';

  const { threadId, isNewThread, workspaceId, userId } = useThreadContext();

  const { onClick } = useOnMarkdownLinkClick({ threadId, workspaceId, userId, eventId });

  const target: ComposerTarget = {
    workspaceId,
    threadId,
    isNewThread,
    type: 'composer',
    eventId,
  };

  const { store } = useApp();
  actions.initComposer(store, target);

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
  const { autoFocus } = useComposerContext();
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
      <LexicalContentEditable
        className={props.className ?? styles.contentEditable()}
        tabIndex={autoFocus ? 1 : 0}
      />
    </div>
  );
}

function ComposerMentionsButton(props: { className?: string }) {
  const { store, events } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const eventId = useOptionalCommentContext() ?? 'default';
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

// we could just use one icon with svg edits, this was quicker
const COMPOSER_PIN_ICONS: { [state: string]: React.ReactElement } = {
  'pin-default': <img src={DeletePinButtonSvg} />,
  'pin-hover': <img src={DeletePinButtonHoverSvg} />,
  'pin-selecting': <img src={PinButtonHoverSvg} />,
  'empty-default': <img src={PinButtonSvg} />,
  'empty-hover': <img src={PinButtonHoverSvg} />,
  'empty-selecting': <img src={PinButtonHoverSvg} />,
};

const COMPOSER_PIN_TOOLTIPS: { [state: string]: string | null } = {
  'pin-default': 'Remove pin',
  'pin-hover': 'Remove pin',
  'pin-selecting': 'Remove pin',
  'empty-default': 'Annotate',
  'empty-hover': 'Annotate',
  'empty-selecting': null,
};

function ComposerPinButton(props: { className?: string }) {
  const { events, store } = useApp();
  const { threadId, workspaceId } = useThreadContext();
  const eventId = useOptionalCommentContext() ?? 'default';
  const { uiState, workspaces } = useSnapshot(store);
  const ref = useRef(null);
  const hover = useHovering(ref);
  const { pendingPin } = workspaces[workspaceId].composers[threadId][eventId];
  const composerTarget = useTarget();

  const state = ((pendingPin ? 'pin' : 'empty') +
    '-' +
    (uiState === 'selecting' ? 'selecting' : hover ? 'hover' : 'default')) as ComposerButtonState;

  const icon = React.cloneElement(COMPOSER_PIN_ICONS[state], {
    style: { position: 'relative', top: '0px', width: '16px', height: '16px' },
  });

  if (composerTarget.type !== 'composer') {
    return null;
  }

  const buttonTarget: ComposerPinButtonTarget = {
    type: 'composerPinButton',
    composer: composerTarget,
    objectId: pendingPin?.objectId,
    pinId: pendingPin?.id,
  } as const;

  const tooltip = COMPOSER_PIN_TOOLTIPS[state];

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <div
          ref={ref}
          className={styles.pinButton}
          {...props}
          onClick={(e) => events.onClick(e, { target: buttonTarget })}
          data-testid="collabkit-composer-pin-button"
        >
          {icon}
        </div>
      </Tooltip.Trigger>
      {tooltip && <Tooltip.Content>{tooltip}</Tooltip.Content>}
    </Tooltip>
  );
}

function ComposerEditor(props: {
  placeholder: React.ReactElement;
  className?: string;
  contentEditable?: JSX.Element;
  children?: React.ReactNode;
}) {
  const target = useTarget();
  const { workspaceId, threadId } = useThreadContext();
  const { autoFocus, initialBody, setHasText } = useComposerContext();
  const { events, store } = useApp();
  const { focusedId, isPinningEnabled } = useSnapshot(store);
  const eventId = useOptionalCommentContext() ?? 'default';

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
      $convertFromMarkdownString(initialBody, TRANSFORMERS);
      $setSelection(null);
    },
  };

  const handleChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      setHasText(editorState.read(() => $getRoot().getTextContentSize() > 0));
      events.onComposerChange(target, editor);
    },
    [events.onComposerChange, target]
  );

  return (
    <div
      data-testid="collabkit-composer-editor"
      className={props.className ?? `${styles.editor({ active })} ${styles.composerGlobalStyles}`}
      onClick={(e) => events.onClick(e, { target })}
    >
      {isPinningEnabled && <Composer.PinButton />}
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <LexicalComposer initialConfig={initialConfig}>
          <EditorPlugin onMount={handleChange} />
          <KeyPlugin onKeyDown={(event) => events.onKeyDown(event)} />
          <PasteTextPlugin />
          <PlainTextPlugin
            contentEditable={props.contentEditable ?? <Composer.ContentEditable />}
            placeholder={props.placeholder}
            ErrorBoundary={(props) => <>{props.children}</>}
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
        {props.children}
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

function ButtonGroup(props: { className?: string; children: React.ReactNode }) {
  return <div className={props.className ?? styles.buttonGroup}>{props.children}</div>;
}

function ComposerButtons() {
  const { workspaceId, threadId } = useThreadContext();
  const eventId = useOptionalCommentContext() ?? 'default';
  const { events } = useApp();
  const { hasText, initialBody } = useComposerContext();

  return hasText ? (
    <ButtonGroup>
      {/* <Composer.MentionsButton /> */}
      {initialBody.length > 0 ? <div style={{ flex: 1 }} /> : null}
      {initialBody.length > 0 && (
        <>
          <button
            data-testid="collabkit-comment-cancel-button"
            onClick={(e) =>
              events.onClick(e, {
                target: {
                  type: 'commentCancelButton',
                  eventId,
                  workspaceId,
                  threadId,
                },
              })
            }
            className={styles.button({ type: 'secondary' })}
          >
            Cancel
          </button>
          <button
            data-testid="collabkit-comment-save-button"
            onClick={(e) => {
              events.onClick(e, {
                target: {
                  type: 'commentSaveButton',
                  eventId,
                  workspaceId,
                  threadId,
                },
              });
            }}
            className={styles.button({ type: 'primary' })}
          >
            Save
          </button>
        </>
      )}
    </ButtonGroup>
  ) : null;
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
      >
        <Composer.Buttons />
      </Composer.Editor>
      <Composer.TypingIndicator />
    </Composer.Root>
  );
}

Composer.Root = ComposerRoot;
Composer.ContentEditable = ComposerContentEditable;
Composer.Editor = ComposerEditor;
Composer.Placeholder = ComposerPlaceholder;
Composer.TypingIndicator = ComposerTypingIndicator;

Composer.Buttons = ComposerButtons;
Composer.MentionsButton = ComposerMentionsButton;
Composer.PinButton = ComposerPinButton;
