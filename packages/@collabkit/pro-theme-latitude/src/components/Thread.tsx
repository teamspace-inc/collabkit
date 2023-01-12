import React from 'react';
import {
  CommentList,
  Composer,
  Profile,
  Scrollable,
  ThemeWrapper,
  Thread as CollabKitThread,
  ThreadProps,
} from '@collabkit/react';
import { useThread } from '@collabkit/react/src/hooks/public/useThread';

export function Thread(props: ThreadProps & { maxHeight?: number }) {
  const { userId } = useThread(props);

  if (!userId) {
    return null;
  }

  return (
    <CollabKitThread.Provider {...props}>
      <Profile.Provider profileId={userId}>
        <ThemeWrapper>
          <CollabKitThread.Root className={props.className} style={props.style}>
            {props.showHeader && <CollabKitThread.Header>Comments</CollabKitThread.Header>}
            <Scrollable autoScroll="bottom" maxHeight={props.maxHeight}>
              <CommentList hideResolveButton={props.hideResolveButton} />
            </Scrollable>
            {props.hideComposer ? null : <Composer />}
          </CollabKitThread.Root>
        </ThemeWrapper>
      </Profile.Provider>
    </CollabKitThread.Provider>
  );
}
