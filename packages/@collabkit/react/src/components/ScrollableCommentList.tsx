import React, { Component } from 'react';
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './ScrollArea';

type Props = {
  children: React.ReactNode;
  className?: string;
};

function toNearest(n: number, nearest: number) {
  return Math.ceil(n / nearest) * nearest;
}

const STICKY_SCROLL_THRESHOLD_PX = 300;

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
      return (
        toNearest(viewport.scrollTop + viewport.offsetHeight, STICKY_SCROLL_THRESHOLD_PX) ===
        toNearest(viewport.scrollHeight, STICKY_SCROLL_THRESHOLD_PX)
      );
    }
    return false;
  }

  componentDidUpdate(_prevProps: Props, _prevState: {}, shouldScrollToBottom: boolean) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    const viewport = this.viewportRef.current;
    if (viewport) {
      if (shouldScrollToBottom) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }

  render() {
    return (
      <ScrollAreaRoot>
        <ScrollAreaViewport ref={this.viewportRef} className={this.props.className}>
          {this.props.children}
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    );
  }
}
