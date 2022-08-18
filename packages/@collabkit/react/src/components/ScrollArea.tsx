import { scrollAreaStyles } from '@collabkit/theme';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { styled } from '@stitches/react';

export const ScrollAreaRoot = styled(ScrollArea.Root, scrollAreaStyles.root);
export const ScrollAreaViewport = styled(ScrollArea.Viewport, scrollAreaStyles.viewport);
export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, scrollAreaStyles.scrollbar);
export const ScrollAreaThumb = styled(ScrollArea.Thumb, scrollAreaStyles.thumb);
export const ScrollAreaCorner = styled(ScrollArea.Corner, scrollAreaStyles.corner);
