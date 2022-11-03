import React from 'react';
import { actions } from '@collabkit/client';
import { useApp } from '../hooks/useApp';
import Comment from './Comment';
import Composer from './composer/Composer';
import { useComposer } from '../hooks/useComposer';
import { useThreadContext } from '../hooks/useThreadContext';
import { useCommentContext } from '../hooks/useCommentContext';
import { ButtonGroup } from './ButtonGroup';
import { useCommentStore } from '../hooks/useCommentStore';
import { composerForm } from '../styles/components/PopoverThread.css';

export const ThreadCommentEditor = () => {
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useCommentContext();
  const { body } = useCommentStore();

  const { store } = useApp();
  const { isEnabled, onPointerDown } = useComposer({ threadId, workspaceId, eventId });

  return (
    <Comment.Editor>
      <Composer.Root className={composerForm} autoFocus={true} body={body}>
        <Composer.Editor contentEditable={<Composer.ContentEditable />} placeholder={<span />} />
        <ButtonGroup
          onCancel={(e) => {
            if (e.button === 0) {
              actions.stopEditing(store);
            }
          }}
          onConfirm={onPointerDown}
          confirmButtonEnabled={isEnabled}
          confirmButtonText={'Save'}
        />
      </Composer.Root>
    </Comment.Editor>
  );
};
