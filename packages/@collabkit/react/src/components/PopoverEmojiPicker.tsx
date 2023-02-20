import React, { useCallback } from 'react';
import { CommentEmojiButtonTargets } from '@collabkit/core';
import { Placement } from '@floating-ui/react';
import { useSnapshot } from 'valtio';
import { useApp } from '../hooks/useApp';
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from './Popover';
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
    <PopoverRoot
      contentVisible={open}
      previewVisible={false}
      onContentChange={onOpenChange}
      onPreviewChange={() => {}}
      // advanced
      placement={props.placement ?? 'top-start'}
      dismissOnClickOutside={true}
      shouldFlipToKeepInView={true}
    >
      <PopoverTrigger>
        <IconButton
          small={props.smallIconButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenChange(!open);
          }}
        >
          <Smiley weight="regular" />
        </IconButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent>
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
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  );
}
