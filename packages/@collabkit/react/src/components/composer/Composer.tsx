import React, { ComponentProps, useEffect, useCallback, ComponentPropsWithoutRef } from 'react';

import { ComposerTarget } from '@collabkit/core';
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

import { actions } from '@collabkit/client';
import { useWorkspaceContext } from '../../hooks/useWorkspaceContext';
import { useUserContext } from '../../hooks/useUserContext';
import { useStore } from '../../hooks/useStore';
import { useComposerStore } from '../../hooks/useComposerStore';
import { ProfileContext } from '../../hooks/useProfile';
import { useIsFocused } from '../../hooks/useIsFocused';
import { ButtonGroup } from './ButtonGroup';

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
  const { isNewThread, initialBody, ...otherProps } = props;

  const target: ComposerTarget = {
    workspaceId,
    threadId,
    type: 'composer',
    isNewThread: isNewThread ?? false,
    eventId,
  };

  const store = useStore();

  useEffect(() => {
    actions.initComposer(store, target);
  }, [target.eventId, target.threadId, target.workspaceId, target.isNewThread]);

  return (
    <ProfileContext.Provider value={userId}>
      <TargetContext.Provider value={target}>
        <div
          data-testid="collabkit-composer-root"
          className={styles.root}
          {...otherProps}
          onClick={onClick}
        />
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
      style={{ display: 'contents' }}
      onBlur={(e) => events.onBlur(e, { target })}
      onFocus={(e) => events.onFocus(e, { target })}
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

const ComposerInput = React.memo(function ComposerInput(props: {
  placeholder: React.ReactElement;
  className?: string;
  contentEditable?: JSX.Element;
  autoFocus?: boolean;
  initialBody?: string;
}) {
  const target = useTarget();
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const { events, store } = useApp();
  const eventId = useDefaultCommentContext();

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
    <div style={{ position: 'relative' }}>
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
    </div>
  );
});

function ComposerEditor(props: ComponentPropsWithoutRef<'div'>) {
  const target = useTarget();
  const { events } = useApp();
  const isFocused = useIsFocused();

  return (
    <div
      data-testid="collabkit-composer-editor"
      className={
        props.className ?? `${styles.editor({ active: isFocused })} ${styles.composerGlobalStyles}`
      }
      onClick={(e) => events.onClick(e, { target })}
      {...props}
    />
  );
}

function ComposerPlaceholder(props: ComponentProps<'span'>) {
  return (
    <span data-testid="collabkit-composer-placeholder" className={styles.placeholder} {...props} />
  );
}

function ComposerConfirmCancelButtonGroup() {
  const threadId = useThreadContext();
  const workspaceId = useWorkspaceContext();
  const eventId = useDefaultCommentContext();
  const isCommentComposer = !!useOptionalCommentContext();
  const { events } = useApp();
  const { hasText } = useSnapshot(useComposerStore());

  return hasText && isCommentComposer ? (
    <ButtonGroup>
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
      <ComposerEditor>
        <ComposerInput
          autoFocus={props.autoFocus}
          placeholder={
            <ComposerPlaceholder>{props.placeholder ?? 'Write a comment'}</ComposerPlaceholder>
          }
        />
        <ComposerConfirmCancelButtonGroup />
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
  ComposerInput,
  ComposerPlaceholder,
  ComposerTypingIndicator,
  ComposerConfirmCancelButtonGroup as ComposerButtons,
  ComposerMentionsButton,
};
