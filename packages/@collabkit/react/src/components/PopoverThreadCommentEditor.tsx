import { commentStyles, composerStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React from 'react';
import { actions } from '@collabkit/client';
import { useApp } from '../hooks/useApp';
import { Button } from './Button';
import * as Comment from './Comment';
import * as Composer from './composer/Composer';

const StyledCommentEditor = styled(Comment.Editor, commentStyles.editor, {
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
});
const StyledComposerRoot = styled(Composer.Root, composerStyles.root);
const StyledComposerEditor = styled(Composer.Editor, composerStyles.editorRoot);
const StyledComposerContent = styled(Composer.Content, composerStyles.content);
const StyledComposerContentEditable = styled(
  Composer.ContentEditable,
  composerStyles.contentEditable
);

export const PopoverThreadCommentEditor = () => {
  const { store } = useApp();
  return (
    <StyledCommentEditor>
      <StyledComposerRoot>
        <StyledComposerEditor
          contentEditable={(props: { autoFocus?: boolean }) => (
            <StyledComposerContent>
              <StyledComposerContentEditable {...props} />
            </StyledComposerContent>
          )}
          placeholder={<span />}
          autoFocus={true}
        />
      </StyledComposerRoot>
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
              actions.stopEditing(store);
            }
          }}
        />
      </div>
    </StyledCommentEditor>
  );
};
