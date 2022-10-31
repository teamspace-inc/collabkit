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

export const CommentEditor = () => {
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useCommentContext();
  const { body } = useCommentStore();

  const { store } = useApp();
  const { isEnabled, onPointerDown } = useComposer({ threadId, workspaceId, eventId });

  return (
    <Composer.Root autoFocus={true} body={body} style={{ display: 'block' }}>
      <Comment.Editor>
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
      </Comment.Editor>
    </Composer.Root>
  );
};
