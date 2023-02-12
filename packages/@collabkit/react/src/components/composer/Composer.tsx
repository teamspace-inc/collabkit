import React, { ComponentProps, useEffect, useCallback, useRef } from 'react';

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
import { useDefaultCommentContext, useOptionalCommentContext } from '../../hooks/useCommentContext';
import { useSnapshot } from 'valtio';
import { $setSelection, EditorState, LexicalEditor } from 'lexical';
import { ComposerTypingIndicator } from '../TypingIndicator';

import { ProfileAvatar } from '../Profile';

import { IconButton } from '../IconButton';
import { EditorPlugin } from './EditorPlugin';
import { At } from '../icons';
import { vars } from '../../theme/theme/index.css';
import { KeyPlugin } from './KeyPlugin';
import PinButtonSvg from './pin-button.svg';
import PinButtonHoverSvg from './pin-button-hover.svg';
import DeletePinButtonSvg from './delete-pin-button.svg';
import DeletePinButtonHoverSvg from './delete-pin-button-hover.svg';

import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';
import { actions } from '@collabkit/client';
import { ComposerPinButtonTarget } from '@collabkit/core';
import { useWorkspaceContext } from '../../hooks/useWorkspaceContext';
import { useUserContext } from '../../hooks/useUserContext';
import { useStore } from '../../hooks/useStore';
import { useComposerStore } from '../../hooks/useComposerStore';
import { ProfileContext } from '../../hooks/useProfile';

function onError(error: any) {
  console.error(error);
}

const initialConfigDefaults = {
  namespace: 'Composer',
  theme: styles.lexicalTheme,
  nodes: [MentionNode, TimestampNode, PinNode, InlineTextNode],
  onError,
};

function ComposerRoot(props: {
  className?: string;
  children: React.ReactNode;
  initialBody?: string;
  isNewThread?: boolean;
  ['data-testid']?: string;
}) {
  const eventId = useDefaultCommentContext();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const userId = useUserContext();

  const { onClick } = useOnMarkdownLinkClick({ threadId, workspaceId, userId, eventId });

  const target: ComposerTarget = {
    workspaceId,
    threadId,
    type: 'composer',
    isNewThread: props.isNewThread ?? false,
    eventId,
  };

  const store = useStore();

  useEffect(() => {
    actions.initComposer(store, target);
  }, [target]);

  return (
    <ProfileContext.Provider value={userId}>
      <TargetContext.Provider value={target}>
        <div
          data-testid={props['data-testid'] ?? 'collabkit-composer-root'}
          className={props.className ?? styles.root}
          onClick={onClick}
        >
          {props.children}
        </div>
      </TargetContext.Provider>
    </ProfileContext.Provider>
  );
}

function ComposerContentEditable(props: { autoFocus?: boolean; className?: string }) {
  const { events } = useApp();
  const target = useTarget();
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
        tabIndex={props.autoFocus ? 1 : 0}
      />
    </div>
  );
}

function ComposerMentionsButton(props: { className?: string }) {
  const { events } = useApp();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const eventId = useDefaultCommentContext();
  const target = { type: 'composerMentionsButton', threadId, workspaceId, eventId } as const;
  const { isMentioning } = useSnapshot(useComposerStore());

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
  const { uiState, hoveringId } = useSnapshot(store);
  const { pendingPin } = useSnapshot(useComposerStore());
  const ref = useRef(null);
  const composerTarget = useTarget();

  const isHovering = hoveringId?.type === 'composerPinButton';

  const state = ((pendingPin ? 'pin' : 'empty') +
    '-' +
    (uiState === 'selecting'
      ? 'selecting'
      : isHovering
      ? 'hover'
      : 'default')) as ComposerButtonState;

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
    <div
      ref={ref}
      onMouseEnter={(e) => events.onMouseEnter(e, { target: buttonTarget })}
      onMouseLeave={(e) => events.onMouseLeave(e, { target: buttonTarget })}
      className={styles.pinButton}
      {...props}
      onClick={(e) => events.onClick(e, { target: buttonTarget })}
      data-testid="collabkit-composer-pin-button"
    >
      <Tooltip>
        <TooltipTrigger>{icon}</TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </div>
  );
}

function ComposerEditor(props: {
  placeholder: React.ReactElement;
  className?: string;
  contentEditable?: JSX.Element;
  autoFocus?: boolean;
  initialBody?: string;
  children?: React.ReactNode;
}) {
  const target = useTarget();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const { events, store } = useApp();
  const { focusedId, isPinningEnabled } = useSnapshot(store);
  const eventId = useDefaultCommentContext();

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
      $convertFromMarkdownString(props.initialBody ?? '', TRANSFORMERS);
      $setSelection(null);
    },
  };

  const handleChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
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
      {isPinningEnabled && <ComposerPinButton />}
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
            contentEditable={
              props.contentEditable ?? <ComposerContentEditable autoFocus={props.autoFocus} />
            }
            placeholder={props.placeholder}
            ErrorBoundary={(props) => <>{props.children}</>}
          />
          <OnChangePlugin onChange={handleChange} />
          {props.autoFocus ? <AutoFocusPlugin /> : <></>}
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
  return (
    <span
      data-testid="collabkit-composer-placeholder"
      className={styles.placeholder()}
      {...props}
    />
  );
}

function ButtonGroup(props: { className?: string; children: React.ReactNode }) {
  return <div className={props.className ?? styles.buttonGroup}>{props.children}</div>;
}

function ComposerButtons() {
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const eventId = useDefaultCommentContext();
  const isCommentComposer = !!useOptionalCommentContext();
  const { events } = useApp();
  const { hasText } = useSnapshot(useComposerStore());

  return hasText && isCommentComposer ? (
    <ButtonGroup>
      {/* <Composer.MentionsButton /> */}
      <div style={{ flex: 1 }} />
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
    </ButtonGroup>
  ) : null;
}

function Composer(props: { autoFocus?: boolean; placeholder?: string; isNewThread?: boolean }) {
  return (
    <ComposerRoot isNewThread={props.isNewThread}>
      <ProfileAvatar />
      <ComposerEditor
        autoFocus={props.autoFocus}
        placeholder={
          <ComposerPlaceholder>{props.placeholder ?? 'Write a comment'}</ComposerPlaceholder>
        }
      >
        <ComposerButtons />
      </ComposerEditor>
      <ComposerTypingIndicator />
    </ComposerRoot>
  );
}

export {
  Composer,
  ComposerRoot,
  ComposerContentEditable,
  ComposerEditor,
  ComposerPlaceholder,
  ComposerTypingIndicator,
  ComposerButtons,
  ComposerMentionsButton,
  ComposerPinButton,
};
