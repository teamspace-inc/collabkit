import { ThreadLocator } from '@collabkit/core';
import { Thread } from './Thread';
import React from 'react';
import { Popover, PopoverTriggerProps } from './Popover';
import { PopoverThreadPreview } from './PopoverThreadPreview';
import { usePopoverThread } from '../hooks/usePopoverThread';
import { root } from '../styles/components/PopoverThread.css';

type PopoverThreadProps = PopoverTriggerProps & ThreadLocator;

export function PopoverThread(props: PopoverThreadProps) {
  const { threadId, ...popoverProps } = usePopoverThread(props);
  const { objectId, ...otherProps } = props;

  return (
    <Popover.Root {...popoverProps}>
      <Popover.Trigger {...otherProps} />
      <Popover.Portal>
        <Popover.Preview>
          <Thread.Provider threadId={threadId}>
            <PopoverThreadPreview />
          </Thread.Provider>
        </Popover.Preview>
        <Popover.Content>
          <div className={root}>
            <Thread threadId={threadId} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
