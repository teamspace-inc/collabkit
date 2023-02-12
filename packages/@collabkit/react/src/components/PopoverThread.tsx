import { ObjectProps } from '@collabkit/core';
import { ThreadProvider } from './Thread';
import React from 'react';
import {
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverContent,
  PopoverPortal,
  PopoverPreview,
  PopoverRoot,
  PopoverTrigger,
} from './Popover';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { previewRoot, root } from '../theme/components/PopoverThread.css';
import { CommentList } from './CommentList';
import { Scrollable } from './Scrollable';
import { Composer } from './composer/Composer';
import { OptionalThreadProps, ThreadProps } from '../types';

export type PopoverThreadProps = Omit<PopoverContentProps, 'children'> &
  PopoverTriggerProps &
  ObjectProps &
  OptionalThreadProps;

function PopoverThreadPreview({ threadId }: { threadId: string }) {
  return (
    <ThreadProvider threadId={threadId}>
      <div className={previewRoot}>
        <Scrollable autoScroll="bottom">
          <CommentList />
        </Scrollable>
      </div>
    </ThreadProvider>
  );
}

export function PopoverThreadContent(props: ThreadProps) {
  return (
    <ThreadProvider {...props}>
      <div className={root}>
        <Scrollable autoScroll="bottom">
          <CommentList />
        </Scrollable>
        <Composer />
      </div>
    </ThreadProvider>
  );
}

export function PopoverThread(props: PopoverThreadProps) {
  const { threadId, ...popoverProps } = usePopoverThread(props);
  const { objectId, lockScroll, placeholder, ...triggerProps } = props;

  return (
    <PopoverRoot
      {...popoverProps}
      onContentChange={popoverProps.onOpenChange}
      contentVisible={popoverProps.threadVisible}
    >
      <PopoverTrigger {...triggerProps} />
      <PopoverPortal>
        <PopoverPreview>
          {popoverProps.hasThread && <PopoverThreadPreview threadId={threadId} />}
        </PopoverPreview>
        <PopoverContent lockScroll={lockScroll}>
          <PopoverThreadContent threadId={threadId} placeholder={placeholder} />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}
