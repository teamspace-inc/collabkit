import { styled } from '@stitches/react';
import React from 'react';
import { useSnapshot } from 'valtio';
import { actions } from '../../../../client/src/actions';
import { useApp } from '../../hooks/useApp';
import { useCommentContext } from '../../hooks/useCommentContext';
import * as Composer from '../composer/Composer';

const StyledComposerRoot = styled(Composer.Root, {});
const StyledComposerEditor = styled(Composer.Editor, {});
const StyledComposerContent = styled(Composer.Content, {
  color: '$colors$primaryText',
});
const StyledComposerContentEditable = styled(Composer.ContentEditable, {
  outline: 'none',
});

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
    <div {...props}>
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
      <button onClick={() => actions.stopEditing(store)}>Cancel</button>
      <button onClick={() => actions.stopEditing(store)}>Save</button>
    </div>
  );
};
