import React from 'react';
import { actions } from '@collabkit/client';
import { useApp } from '../hooks/useApp';
import { Button } from './Button';
import * as Comment from './Comment';
import * as Composer from './composer/Composer';

export const PopoverThreadCommentEditor = () => {
  const { store } = useApp();
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
            if (e.button === 0) {
              actions.stopEditing(store);
            }
          }}
        />
        <Button
          type="primary"
          text="Save"
          onPointerDown={(e) => {
            if (e.button === 0) {
              actions.updateComment(store);
              actions.stopEditing(store);
            }
          }}
        />
      </div>
    </Comment.Editor>
  );
};
