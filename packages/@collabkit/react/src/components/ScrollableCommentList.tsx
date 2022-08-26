import React, { Component } from 'react';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './ScrollArea';
import { Timeline } from '@collabkit/core';
import { CommentList } from './CommentList';

type Props = {
  timeline: Timeline;
  workspaceId: string;
  userId: string;
  threadId: string;
  seenUntil?: string;
  isPreview?: boolean;
  newIndicatorId?: string | null;
};

export class ScrollableCommentList extends Component<Props> {
  viewportRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const viewport = this.viewportRef.current;
    if (viewport != null) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }

  getSnapshotBeforeUpdate(_prevProps: Props): boolean {
    const viewport = this.viewportRef.current;
    if (viewport != null) {
      return viewport.scrollTop + viewport.offsetHeight === viewport.scrollHeight;
    }
    return false;
  }

  componentDidUpdate(_prevProps: Props, _prevState: {}, shouldScrollBottom: boolean) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    const viewport = this.viewportRef.current;
    if (viewport && shouldScrollBottom) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }

  render() {
    const props = this.props;
    if (!props.workspaceId) {
      return null;
    }
    return (
      <ScrollAreaRoot>
        <ScrollAreaViewport ref={this.viewportRef}>
          <CommentList
            seenUntil={props.seenUntil}
            threadId={props.threadId}
            userId={props.userId}
            workspaceId={props.workspaceId}
            isPreview={props.isPreview}
            timeline={props.timeline}
            newIndicatorId={props.newIndicatorId}
          />
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    );
  }
}
