import { useCallback, useEffect, useRef } from 'react';
import ScrollArea from './ScrollArea';
import React from 'react';
import { Comment } from './Comment';
import { Profile, Timeline } from '../constants';
import { styled } from '@stitches/react';

export const StyledCommentList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: 0,
  padding: '0px 0px',
});

export function CommentList(props: {
  type?: 'popout' | 'inline';
  profiles: { [profileId: string]: Profile };
  timeline: Timeline;
  composerHeight: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { profiles, timeline, composerHeight } = props;
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current?.scrollHeight + 10);
  }, [timeline && Object.keys(timeline).length]);
  const handleScroll = useCallback((e: React.SyntheticEvent) => {
    // todo use this to load more comments
  }, []);
  return (
    <StyledCommentList
      style={composerHeight > -1 ? { maxHeight: `calc(100% - ${composerHeight + 2}px)` } : {}}
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
          {Object.keys(timeline).map((id) => (
            <Comment
              timestamp={timeline[id].createdAt}
              key={id}
              body={timeline[id].body}
              profile={profiles[timeline[id].createdById]}
            />
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </StyledCommentList>
  );
}
