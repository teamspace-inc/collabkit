import React from 'react';
import {
  CommentList,
  ComposerContentEditable,
  ComposerEditor,
  ComposerInput,
  ComposerPlaceholder,
  ComposerRoot,
  ComposerTypingIndicator,
  ProfileAvatar,
  Scrollable,
  ThreadHeader,
  ThreadProps,
  ThreadRoot,
  useIsAuthenticated,
} from '@collabkit/react';

export function Thread(props: ThreadProps & { maxHeight?: number }) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ThreadRoot {...props}>
      {props.showHeader && <ThreadHeader>Comments</ThreadHeader>}
      <Scrollable autoScroll="bottom" maxHeight={props.maxHeight}>
        <CommentList />
      </Scrollable>
      {props.hideComposer ? null : (
        <ComposerRoot>
          <ProfileAvatar />
          <ComposerEditor>
            <ComposerInput
              autoFocus={props.autoFocus}
              placeholder={<ComposerPlaceholder>{props.placeholder}</ComposerPlaceholder>}
              contentEditable={<ComposerContentEditable />}
            />
          </ComposerEditor>

          <ComposerTypingIndicator />
        </ComposerRoot>
      )}
    </ThreadRoot>
  );
}
