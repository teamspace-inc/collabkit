import { ObjectProps } from '@collabkit/core';
import Thread from './Thread';
import React from 'react';
import Popover, { PopoverContentProps, PopoverTriggerProps } from './Popover';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { previewRoot, root } from '../theme/components/PopoverThread.css';
import CommentList from './CommentList';
import { Scrollable } from './Scrollable';
import Composer from './composer/Composer';
import type { OptionalThreadProps, ThreadProps } from '../types';

export type PopoverThreadProps = Omit<PopoverContentProps, 'children'> &
  PopoverTriggerProps &
  ObjectProps &
  OptionalThreadProps;

function PopoverThreadPreview({ threadId }: { threadId: string }) {
  return (
    <Thread.Provider threadId={threadId}>
      <div className={previewRoot}>
        <Scrollable autoScroll="bottom">
          <CommentList />
        </Scrollable>
      </div>
    </Thread.Provider>
  );
}

function PopoverThreadContent(props: ThreadProps) {
  return (
    <Thread.Provider {...props}>
      <div className={root}>
        <Scrollable autoScroll="bottom">
          <CommentList />
        </Scrollable>
        <Composer />
      </div>
    </Thread.Provider>
  );
}

function PopoverThread(props: PopoverThreadProps) {
  const { threadId, ...popoverProps } = usePopoverThread(props);
  const { objectId, lockScroll, placeholder, ...triggerProps } = props;

  return (
    <Popover.Root
      {...popoverProps}
      onContentChange={popoverProps.onOpenChange}
      contentVisible={popoverProps.threadVisible}
    >
      <Popover.Trigger {...triggerProps} />
      <Popover.Portal>
        <Popover.Preview>
          {popoverProps.hasThread && <PopoverThreadPreview threadId={threadId} />}
        </Popover.Preview>
        <Popover.Content lockScroll={lockScroll}>
          <PopoverThreadContent threadId={threadId} placeholder={placeholder} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default Object.assign(PopoverThread, {
  Preview: PopoverThreadPreview,
  Content: PopoverThreadContent,
});
