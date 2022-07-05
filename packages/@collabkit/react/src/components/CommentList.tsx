import { useCallback, useEffect, useRef } from 'react';
import ScrollArea from './ScrollArea';
import React from 'react';
import { Comment, TypingIndicator } from './Comment';
import { Event, Profile, Timeline, WithID } from '../constants';
import { styled } from '@stitches/react';
import { Target } from './Target';
import equal from 'fast-deep-equal';

const StyledCommentList = styled('div', {
  gap: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  flex: 1,
});

export const CommentList = React.memo(function CommentList(props: {
  type?: 'popout' | 'inline';
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

  const scrollRef = useRef<HTMLDivElement>(null);
  const { profiles, timeline, composerHeight } = props;

  const eventIds = Object.keys(timeline);

  const events: WithID<Event>[] = eventIds.map((eventId) => ({
    ...timeline[eventId],
    id: eventId,
  }));

  const reactionEvents = events.filter((event) => event.type === 'reaction');

  const messageEvents = events.filter(
    (event) => event.type === 'message' || event.type === 'system'
  );

  const reactions = reactionEvents.reduce<{ [parentId: string]: { [createdById: string]: Event } }>(
    (reactions, event, i) => {
      if (!event.parentId) {
        return reactions;
      }
      reactions[event.parentId] ||= {};
      reactions[event.parentId][event.createdById] = event;
      return reactions;
    },
    {}
  );

  const groupedList = messageEvents.reduce<WithID<Event>[][]>((groupedEvents, event, i) => {
    const prevEvent = timeline[messageEvents.map((e) => e.id)[i - 1]];
    // since idiomatic use of firebase does not include the eventId inside
    // the event, we need to add it here to make passing the event around
    // in React easier.
    if (prevEvent) {
      if (prevEvent.createdById === event.createdById) {
        if (typeof prevEvent.createdAt === 'number' && typeof event.createdAt === 'number') {
          // 5 minutes before last message and same person results
          // in a grouped message.
          if (prevEvent.createdAt + 1000 * 60 * 5 > event.createdAt) {
            if (groupedEvents[groupedEvents.length - 1]) {
              groupedEvents[groupedEvents.length - 1].push(event);
              return groupedEvents;
            }
          }
        }
      }
    }
    return groupedEvents.concat([[event]]);
  }, []);

  // todo this needs reworking anyway to show a 'new messages' button
  useEffect(() => {
    console.log({ scrolling: true });
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
    <StyledCommentList
      style={
        composerHeight > -1
          ? { maxHeight: `calc(100% - ${composerHeight + 2}px - ${props.headerHeight}px)` }
          : {}
      }
    >
      <ScrollArea.Root style={{ ...(props.type === 'popout' ? { height: 352 } : {}) }}>
        <ScrollArea.Viewport
          css={{
            display: 'flex',
            flex: 1,
          }}
          onScroll={handleScroll}
          ref={scrollRef}
        >
          {groupedList.map((group, i) =>
            group.map((event, j) => {
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
                    event={event}
                    reactions={reactions[event.id]}
                    threadType={props.type ?? 'inline'}
                    type={type}
                    timestamp={event.createdAt}
                    key={`event-${i}-${j}`}
                    body={event.body}
                    profile={profile}
                  />
                </Target>
              );
            })
          )}
          {props.isTyping
            ? Object.keys(props.isTyping).map((endUserId) =>
                // skip current user
                endUserId !== props.userId ? (
                  props.isTyping?.[endUserId] === true ? (
                    <TypingIndicator profile={profiles[endUserId]} />
                  ) : null
                ) : null
              )
            : null}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </StyledCommentList>
  );
},
equal);
