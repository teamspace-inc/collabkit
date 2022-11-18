import React from 'react';
import {
  Button,
  CommentList,
  Composer,
  Popover,
  PopoverThreadProps,
  Scrollable,
  Thread,
  useComposer,
  usePopoverThread,
} from '@collabkit/react';
import { CashboardComment } from './Comment';

function PopoverThreadPreview({ threadId }: { threadId: string }) {
  return (
    <Thread.Provider threadId={threadId}>
      <div className="rounded-lg w-[270px] border border-solid border-cb-bg3 shadow-cb-standard hover:shadow-cb-high">
        <Scrollable autoScroll="bottom">
          <CommentList renderComment={(props) => <CashboardComment {...props} />} />
        </Scrollable>
      </div>
    </Thread.Provider>
  );
}

export function PopoverThreadContent({ hideThread }: { hideThread: () => void }) {
  const { canSend, send, hasMentions } = useComposer();
  return (
    <div className="rounded-lg w-[270px] border border-solid border-cb-bg3 shadow-cb-high">
      <Scrollable autoScroll="bottom">
        <CommentList renderComment={(props) => <CashboardComment {...props} />} />
      </Scrollable>
      <Composer.Root className="border-t border-cb-bg3 pt-4 px-4">
        <Composer.Editor
          placeholder={<Composer.Placeholder>Comment or add others with @</Composer.Placeholder>}
        />
      </Composer.Root>
      {hasMentions && (
        <div className="pt-2 px-4 text-sm">
          Your @mention will add people to this conversation and send an email.
        </div>
      )}
      <div className="flex gap-2 justify-end p-4 pt-3">
        <Button text="Cancel" type="secondary" onPointerDown={hideThread} />
        <Button text="Comment" type="primary" onPointerDown={send} disabled={!canSend} />
      </div>
    </div>
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
          {popoverProps.hasThread && (
            <Thread.Provider {...popoverProps}>
              <PopoverThreadPreview threadId={popoverProps.threadId} />
            </Thread.Provider>
          )}
        </Popover.Preview>
        <Popover.Content lockScroll={lockScroll}>
          <Thread.Provider {...popoverProps}>
            <PopoverThreadContent {...popoverProps} />
          </Thread.Provider>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
