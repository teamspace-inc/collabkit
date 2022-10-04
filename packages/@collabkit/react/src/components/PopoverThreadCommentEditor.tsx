import React from 'react';
import { actions } from '@collabkit/client';
import { useApp } from '../hooks/useApp';
import { Button } from './Button';
import * as Comment from './Comment';
import * as Composer from './composer/Composer';
import { useComposer } from '../hooks/useComposer';
import { useThreadContext } from '../hooks/useThreadContext';
import { useCommentContext } from '../hooks/useCommentContext';

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
      <div
        style={{ display: 'flex', gap: '12px', marginRight: '16px', justifyContent: 'flex-end' }}
      >
        <Button
          type="secondary"
          text="Cancel"
          onPointerDown={(e) => {
            // move this to events
            if (e.button === 0) {
              actions.stopEditing(store);
            }
          }}
        />
        <Button type="primary" text="Save" disabled={!isEnabled} onPointerDown={onPointerDown} />
      </div>
    </Comment.Editor>
  );
};
