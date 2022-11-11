import { ObjectProps } from '@collabkit/core';
import { Thread } from './Thread';
import React from 'react';
import { Popover, PopoverTriggerProps, PopoverContentProps } from './Popover';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { previewRoot, root } from '../styles/components/PopoverThread.css';
import CommentList from './CommentList';
import { Scrollable } from './ScrollArea';
import { ThemeWrapper } from './ThemeWrapper';
import Composer from './composer/Composer';
import { OptionalThreadProps } from '../types';

export type PopoverThreadProps = PopoverContentProps &
  PopoverTriggerProps &
  ObjectProps &
  OptionalThreadProps;

function PopoverThreadPreview(props: {}) {
  return (
    <ThemeWrapper>
      <div className={previewRoot} data-collabkit-internal="true">
        <Scrollable autoScroll="bottom">
          <CommentList />
        </Scrollable>
      </div>
    </ThemeWrapper>
  );
}

export function PopoverThreadThread(props: {}) {
  return (
    <ThemeWrapper>
      <div className={root} data-collabkit-internal="true">
        <Scrollable autoScroll="bottom">
          <CommentList />
        </Scrollable>
        <Composer />
      </div>
    </ThemeWrapper>
  );
}

export function PopoverThread(props: PopoverThreadProps) {
  const { threadId, ...popoverProps } = usePopoverThread(props);
  const { objectId, lockScroll, ...otherProps } = props;

  return (
    <Popover.Root {...popoverProps}>
      <Popover.Trigger {...otherProps} />
      <Popover.Portal>
        <Popover.Preview>
          {/* todo @nc: consider adding 
          hasPreview and hasPopover 
          to avoid this */}
          {popoverProps.hasThread ? (
            <Thread.Provider threadId={threadId} {...props}>
              <PopoverThreadPreview />
            </Thread.Provider>
          ) : null}
        </Popover.Preview>
        <Popover.Content lockScroll={lockScroll}>
          <Thread.Provider threadId={threadId} {...props}>
            <PopoverThreadThread />
          </Thread.Provider>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
