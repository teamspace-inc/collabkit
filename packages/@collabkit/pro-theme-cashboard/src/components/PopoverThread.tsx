import React from 'react';
import {
  Button,
  CommentList,
  Composer,
  Popover,
  PopoverThreadProps,
  Profile,
  Scrollable,
  Thread,
  useComposer,
  usePopoverThread,
} from '@collabkit/react';
import { CashboardComment } from './Comment';

function PopoverThreadPreview() {
  return (
    <div className="bg-white rounded-lg w-[270px] border border-solid border-cb-bg3 shadow-cb-standard hover:shadow-cb-high">
      <Scrollable autoScroll="bottom">
        <CommentList renderComment={(props) => <CashboardComment {...props} />} />
      </Scrollable>
    </div>
  );
}

export function PopoverThreadContent({
  hasThread,
  hideThread,
}: {
  hasThread: boolean;
  hideThread: () => void;
}) {
  const { canSend, send, hasMentions } = useComposer();
  const composerBorder = hasThread ? 'border-t border-cb-bg3' : 'border-t border-transparent';
  return (
    <div className="bg-white rounded-lg w-[270px] border border-solid border-cb-bg3 shadow-cb-high">
      <Scrollable autoScroll="bottom">
        <CommentList
          className="flex flex-col py-4 gap-2 empty:p-0"
          renderComment={(props) => <CashboardComment {...props} />}
        />
      </Scrollable>
      <Composer.Root className={`${composerBorder} pt-4 px-4`}>
        {!hasThread && (
          <div className="flex items-center gap-3 mb-3">
            <Profile.Avatar />
            <Profile.Name />
          </div>
        )}
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
              <PopoverThreadPreview />
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
