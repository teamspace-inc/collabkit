import React from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { useThread } from '../hooks/useThread';
import { previewRoot } from '../styles/components/PopoverThread.css';
import CommentList from './CommentList';

import { Scrollable } from './ScrollArea';
import { ThemeWrapper } from './ThemeWrapper';
import { useThreadContext } from '../hooks/useThreadContext';

export function PopoverThreadPreview() {
  const { threadId, workspaceId } = useThreadContext();
  const { store } = useApp();
  const { userId } = useSnapshot(store);

  const { isEmpty } = useThread({
    threadId,
    workspaceId,
  });

  if (!workspaceId || !userId || isEmpty) {
    return null;
  }

  return (
    <ThemeWrapper>
      <div className={previewRoot} data-collabkit-internal="true">
        <Scrollable maxHeight={'unset'}>
          <CommentList />
        </Scrollable>
      </div>
    </ThemeWrapper>
  );
}
