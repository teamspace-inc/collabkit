import React from 'react';
import {
  Thread,
  Composer,
  CommentList,
  Popover,
  Scrollable,
  PopoverThreadProps,
  usePopoverThread,
} from '@collabkit/react';
import { CustomComment } from './CustomComment';

const shadowHigh = '0px -12px 24px rgba(0, 0, 0, 0.02), 0px 12px 24px rgba(0, 0, 0, 0.06)';

function PopoverThreadPreview({ threadId }: { threadId: string }) {
  return (
    <Thread.Provider threadId={threadId}>
      <div
        className="w-[270px]"
        style={{
          boxShadow: shadowHigh,
        }}
      >
        <Scrollable autoScroll="bottom">
          <CommentList renderComment={(props) => <CustomComment {...props} />} />
        </Scrollable>
      </div>
    </Thread.Provider>
  );
}

export function PopoverThreadContent({
  threadId,
  hideThread,
}: {
  threadId: string;
  hideThread: () => void;
}) {
  return (
    <Thread.Provider threadId={threadId}>
      <div
        className="w-[270px]"
        style={{
          boxShadow: shadowHigh,
        }}
      >
        <Scrollable autoScroll="bottom">
          <CommentList renderComment={(props) => <CustomComment {...props} />} />
        </Scrollable>
        <Composer />
        <div className="flex gap-2 justify-end p-4 pt-1">
          <button
            className=" hover:bg-cb-bg4 font-semibold text-cb-fg-2 text-xs rounded-md px-[10px] py-[7px]"
            type="button"
            onClick={hideThread}
          >
            Cancel
          </button>
          <button
            className="bg-prime-norm hover:bg-prime-hover active:bg-prime-pressed font-semibold text-white text-xs rounded-md px-[10px] py-[7px]"
            type="button"
            disabled={false /* todo */}
            onPointerDown={() => {}}
          >
            Comment
          </button>
        </div>
      </div>
    </Thread.Provider>
  );
}

export function PopoverThread(props: PopoverThreadProps) {
  const popoverProps = usePopoverThread(props);
  const { objectId, lockScroll, ...triggerProps } = props;

  return (
    <Popover.Root {...popoverProps}>
      <Popover.Trigger {...triggerProps} />
      <Popover.Portal>
        <Popover.Preview>
          {popoverProps.hasThread && <PopoverThreadPreview threadId={popoverProps.threadId} />}
        </Popover.Preview>
        <Popover.Content lockScroll={lockScroll}>
          <PopoverThreadContent {...popoverProps} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
