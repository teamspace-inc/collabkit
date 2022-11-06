import { ObjectProps } from '@collabkit/core';
import { Thread } from './Thread';
import React from 'react';
import { Popover, PopoverTriggerProps } from './Popover';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { previewRoot, root } from '../styles/components/PopoverThread.css';
import CommentList from './CommentList';
import { Scrollable } from './ScrollArea';
import { ThemeWrapper } from './ThemeWrapper';
import Composer from './composer/Composer';

export type PopoverThreadProps = PopoverTriggerProps & ObjectProps;

function PopoverThreadPreview(props: {}) {
  return (
    <ThemeWrapper>
      <div className={previewRoot} data-collabkit-internal="true">
        <Scrollable>
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
        <Scrollable>
          <CommentList />
        </Scrollable>
        <Composer />
      </div>
    </ThemeWrapper>
  );
}

export function PopoverThread(props: PopoverThreadProps) {
  const { threadId, ...popoverProps } = usePopoverThread(props);
  const { objectId, ...otherProps } = props;

  return (
    <Popover.Root {...popoverProps}>
      <Popover.Trigger {...otherProps} />
      <Popover.Portal>
        <Popover.Preview>
          {/* todo @nc: consider adding 
          hasPreview and hasPopover 
          to avoid this */}
          {popoverProps.hasThread ? (
            <Thread.Provider threadId={threadId}>
              <PopoverThreadPreview />
            </Thread.Provider>
          ) : null}
        </Popover.Preview>
        <Popover.Content>
          <Thread.Provider threadId={threadId}>
            <PopoverThreadThread />
          </Thread.Provider>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
