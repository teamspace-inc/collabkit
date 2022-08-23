import { useCallback, useEffect, useRef } from 'react';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './ScrollArea';
import React from 'react';
import { Timeline } from '../constants';
import equal from 'fast-deep-equal';
import { useTimeline } from '../hooks/useTimeline';
import { CommentList } from './CommentList';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';

export const ScrollableCommentList = React.memo(function ScrollableCommentList(props: {
  isTyping?: { [endUserId: string]: boolean };
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
  seenUntil?: string;
  isPreview?: boolean;
}) {
  const { workspaceId } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { timeline } = props;

  const { store } = useApp();
  const { profiles } = useSnapshot(store);
  const { messageEvents, reactionEvents } = useTimeline(timeline);

  // todo this needs reworking anyway to show a 'new messages' button
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  }, [
    messageEvents.length,
    // did react to last message
    reactionEvents[reactionEvents.length - 1]?.parentId ===
      messageEvents[messageEvents.length - 1]?.id,
    // someone is typing
    // this can be annoying, we should find a way to show that
    // below the composer
    props.isTyping ? Object.keys(props.isTyping) : null,
    messageEvents.map((event) => event.createdById).every((userId) => profiles[userId]),
  ]);

  const handleScroll = useCallback((e: React.SyntheticEvent) => {
    // todo use this to load more comments when scrolling to top / near the top
  }, []);

  if (!workspaceId) {
    return null;
  }

  return (
    <ScrollAreaRoot ref={rootRef}>
      <ScrollAreaViewport onScroll={handleScroll} ref={scrollRef}>
        <CommentList
          seenUntil={props.seenUntil}
          isTyping={props.isTyping}
          threadId={props.threadId}
          userId={props.userId}
          workspaceId={workspaceId}
          isPreview={props.isPreview}
          timeline={timeline}
        />
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
},
equal);
