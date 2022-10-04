import React from 'react';
import { actions } from '@collabkit/client';
import { useApp } from '../hooks/useApp';
import * as Comment from './Comment';
import * as Composer from './composer/Composer';
import { useComposer } from '../hooks/useComposer';
import { useThreadContext } from '../hooks/useThreadContext';
import { useCommentContext } from '../hooks/useCommentContext';
import { ButtonGroup } from './ButtonGroup';

export const PopoverThreadCommentEditor = () => {
  const { threadId, workspaceId } = useThreadContext();
  const { eventId } = useCommentContext();

  const { store } = useApp();
  const { isEnabled, onPointerDown } = useComposer({ threadId, workspaceId, eventId });

  return (
    <Comment.Editor>
      <Composer.Root>
        <Composer.Editor
          contentEditable={(props: { autoFocus?: boolean }) => (
            <Composer.ContentEditable {...props} />
          )}
          placeholder={<span />}
          autoFocus={true}
        />
      </Composer.Root>
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
  );
};
