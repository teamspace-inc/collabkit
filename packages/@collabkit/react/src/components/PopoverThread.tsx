import { ObjectProps } from '@collabkit/core';
import { Thread } from './Thread';
import React from 'react';
import { Popover, PopoverTriggerProps, PopoverContentProps } from './Popover';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { previewRoot, root } from '../theme/components/PopoverThread.css';
import CommentList from './CommentList';
import { Scrollable } from './Scrollable';
import Composer from './composer/Composer';
import { OptionalThreadProps, ThreadProps } from '../types';

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

export function PopoverThreadContent(props: ThreadProps) {
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

export function PopoverThread(props: PopoverThreadProps) {
  const { threadId, ...popoverProps } = usePopoverThread(props);
  const { objectId, lockScroll, placeholder, ...triggerProps } = props;

  return (
    <Popover.Root {...popoverProps}>
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
