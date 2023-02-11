import React, { useCallback } from 'react';
import { CommentEmojiButtonTargets } from '@collabkit/core';
import { Placement } from '@floating-ui/react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { Popover } from './Popover';
import { IconButton } from './IconButton';
import { Smiley } from './icons';
import { EmojiPicker } from './EmojiPicker';
import { isEqual } from '@collabkit/core';

export function PopoverEmojiPicker(props: {
  placement?: Placement;
  target: CommentEmojiButtonTargets;
  smallIconButton?: boolean;
}) {
  const { target } = props;
  const { events, store } = useApp();
  const { reactingId } = useSnapshot(store);
  const open = isEqual(reactingId, target);

  const onOpenChange = useCallback(
    (open: boolean) => {
      events.onReactionPickerOpenChange({ target, open });
    },
    [target, open]
  );

  return (
    <Popover.Root
      contentVisible={open}
      previewVisible={false}
      onContentChange={onOpenChange}
      onPreviewChange={() => {}}
      // advanced
      placement={props.placement ?? 'left-start'}
      dismissOnClickOutside={true}
      shouldFlipToKeepInView={false}
    >
      <Popover.Trigger>
        <IconButton small={props.smallIconButton} onClick={() => onOpenChange(!open)}>
          <Smiley weight="regular" />
        </IconButton>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <EmojiPicker
            onClick={(e, emoji) => {
              events.onClick(e, {
                target: {
                  ...target,
                  type: 'emoji',
                  emoji,
                },
              });
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
