import { useCallback, useEffect, useRef } from 'react';
import ScrollArea from './ScrollArea';
import React from 'react';
import { Comment } from './Comment';
import { Profile, Timeline } from '../constants';
import { Target } from './Target';
import equal from 'fast-deep-equal';
import { CurrentlyTyping } from './comment/TypingIndicator';
import { useTimeline } from '../hooks/useTimeline';
import { CommentList, StyledCommentList } from './CommentList';

export const ScrollableCommentList = React.memo(function ScrollableCommentList(props: {
  isTyping?: { [endUserId: string]: boolean };
  profiles: { [profileId: string]: Profile };
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
  isPreview?: boolean;
}) {
  const { threadId, workspaceId } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { profiles, timeline } = props;

  const { list, messageEvents, reactionEvents, reactions } = useTimeline(timeline);

  // todo this needs reworking anyway to show a 'new messages' button
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  }, [
    messageEvents.length,
    // props.composerHeight,
    // did react to last message
    reactionEvents[reactionEvents.length - 1]?.parentId ===
      messageEvents[messageEvents.length - 1]?.id,
    // someone is typing
    props.isTyping ? Object.keys(props.isTyping) : null,
  ]);

  const handleScroll = useCallback((e: React.SyntheticEvent) => {
    // todo use this to load more comments when scrolling to top / near the top
  }, []);

  if (!workspaceId) {
    return null;
  }

  return (
    <ScrollArea.Root ref={rootRef}>
      <ScrollArea.Viewport onScroll={handleScroll} ref={scrollRef}>
        <CommentList
          isTyping={props.isTyping}
          profiles={profiles}
          threadId={props.threadId}
          userId={props.userId}
          workspaceId={workspaceId}
          isPreview={props.isPreview}
          timeline={timeline}
        ></CommentList>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
},
equal);
