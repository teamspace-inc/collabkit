import { useCallback, useEffect, useRef } from 'react';
import ScrollArea from './ScrollArea';
import React from 'react';
import { Comment } from './Comment';
import { Profile, Timeline } from '../constants';
import { Target } from './Target';
import equal from 'fast-deep-equal';
import { CurrentlyTyping } from './comment/TypingIndicator';
import { useTimeline } from '../hooks/useTimeline';
import { StyledCommentList } from './CommentList';

export const ScrollableCommentList = React.memo(function ScrollableCommentList(props: {
  isTyping?: { [endUserId: string]: boolean };
  profiles: { [profileId: string]: Profile };
  timeline: Timeline;
  composerHeight: number;
  headerHeight: number;
  workspaceId: string;
  userId: string;
  threadId: string;
}) {
  const { threadId, workspaceId } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { profiles, timeline, composerHeight } = props;

  const { list, messageEvents, reactionEvents, reactions } = useTimeline(timeline);

  // todo this needs reworking anyway to show a 'new messages' button
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight);
  }, [
    messageEvents.length,
    props.composerHeight,
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
    <div
      style={
        composerHeight > -1
          ? {
              height: '100%',
              maxHeight: `calc(100% - ${composerHeight + 2}px - ${props.headerHeight}px)`,
            }
          : { height: '100%' }
      }
    >
      <ScrollArea.Root ref={rootRef}>
        <ScrollArea.Viewport onScroll={handleScroll} ref={scrollRef}>
          <StyledCommentList>
            {list.map((group, i) => (
              <span key={`group-${i}`}>
                {group.map((event, j) => {
                  let type: 'default' | 'inline-start' | 'inline' | 'inline-end' = 'default';

                  if (group.length > 1) {
                    type = 'inline';

                    if (j === 0) {
                      type = 'inline-start';
                    }

                    if (j === group.length - 1) {
                      type = 'inline-end';
                    }
                  }

                  const profile = profiles[event.createdById];

                  return (
                    <Target
                      key={event.id}
                      target={{ type: 'comment', eventId: event.id, workspaceId, threadId }}
                    >
                      <Comment
                        id={event.id}
                        event={event}
                        reactions={reactions[event.id]}
                        type={type}
                        timestamp={event.createdAt}
                        key={`event-${i}-${j}`}
                        rootRef={rootRef}
                        scrollRef={scrollRef}
                        body={event.body}
                        profile={profile}
                      />
                    </Target>
                  );
                })}
              </span>
            ))}
            <CurrentlyTyping profiles={profiles} userId={props.userId} isTyping={props.isTyping} />
          </StyledCommentList>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
},
equal);
