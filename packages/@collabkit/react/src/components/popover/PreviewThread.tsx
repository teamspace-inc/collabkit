import { timelineUtils } from '@collabkit/core';
import React, { forwardRef } from 'react';
import { useSnapshot } from 'valtio';
import { useApp } from '../../hooks/useApp';
import { useThread } from '../../hooks/useThread';
import { useTimeline } from '../../hooks/useTimeline';
import { ThemeWrapper } from '../ThemeWrapper';
import { Thread } from '../Thread';
import * as styles from '../../styles/components/PopoverThread.css';
import Comment from '../Comment';
import { Handle, PopoverThreadProps } from './PopoverThread';

function ThreadFirstComment() {
  const { store } = useApp();
  const timeline = useTimeline();
  const { profiles } = useSnapshot(store);
  const { messageEvents } = timelineUtils.groupedTimeline(timeline ?? {});
  const event = messageEvents?.[0];
  const profile = event && profiles[event?.createdById];
  if (!event || !profile) {
    return null;
  }

  return <Comment commentId={event.id} />;
}

export const PreviewThread = forwardRef<Handle, PopoverThreadProps>(function PopoverThread(
  props: PopoverThreadProps,
  ref
) {
  const { store } = useApp();
  const { workspaceId } = useSnapshot(store);

  useThread({
    ...props,
    store,
    workspaceId,
  });

  return (
    <Thread.Provider {...props}>
      <ThemeWrapper>
        <div
          className={styles.previewRoot}
          data-collabkit-internal="true"
          style={props.style}
          ref={ref}
        >
          <ThreadFirstComment />
        </div>
      </ThemeWrapper>
    </Thread.Provider>
  );
});
