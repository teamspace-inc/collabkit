import { composerStyles } from '@collabkit/theme';
import { styled } from '@stitches/react';
import React from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../../../../client/src/actions';
import { useApp } from '../../hooks/useApp';
import { useCommentContext } from '../../hooks/useCommentContext';
import { Button } from '../Button';
import * as Composer from '../composer/Composer';

const StyledComposerRoot = styled(Composer.Root, composerStyles.root);
const StyledComposerEditor = styled(Composer.Editor, composerStyles.editorRoot);
const StyledComposerContent = styled(Composer.Content, composerStyles.content);
const StyledComposerContentEditable = styled(
  Composer.ContentEditable,
  composerStyles.contentEditable
);

export const CommentEditor = (props: React.ComponentProps<'div'>) => {
  const { store } = useApp();
  const { editingId } = useSnapshot(store);
  const { eventId } = useCommentContext();
  const isEditing = editingId?.eventId === eventId;
  if (!isEditing) {
    return null;
  }
  const initialEditorState = undefined; // TODO
  return (
    <div
      {...props}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '0px -16px' }}
    >
      <StyledComposerRoot>
        <StyledComposerEditor
          contentEditable={(props: { autoFocus?: boolean }) => (
            <StyledComposerContent>
              <StyledComposerContentEditable {...props} />
            </StyledComposerContent>
          )}
          placeholder={<span />}
          autoFocus={true}
          initialEditorState={initialEditorState}
        />
      </StyledComposerRoot>
      <div style={{ display: 'flex', gap: '12px', marginRight: '16px' }}>
        <div style={{ flex: 1 }}></div>
        <Button type="secondary" text="Cancel" onPointerDown={() => actions.stopEditing(store)} />
        <Button type="primary" text="Save" onPointerDown={() => actions.stopEditing(store)} />
      </div>
    </div>
  );
};
