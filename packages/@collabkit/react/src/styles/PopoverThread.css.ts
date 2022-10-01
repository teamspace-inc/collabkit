import { style } from '@vanilla-extract/css';
import { vars } from './themes.css';
import * as composerStyles from './Composer.css';
import * as commentStyles from './Comment.css';

export const root = style({
  boxSizing: 'border-box',
  backgroundColor: vars.popoverThread.background,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  width: vars.popoverThread.width,
  border: vars.popoverThread.border,
  boxShadow: vars.popoverThread.boxShadow,
  borderRadius: vars.popoverThread.borderRadius,
});

export const commentList = style({
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
});

export const comment = style([
  commentStyles.root({ type: 'default' }),
  {
    padding: '16px',
    gap: '12px',
  },
]);

export const commentHeader = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'row',
  gap: vars.space[2],
  lineHeight: '160%',
});

export const composer = style([
  composerStyles.root,
  {
    borderTop: vars.popoverThread.composer.borderTop,
    alignItems: vars.popoverThread.composer.alignItems,
    padding: vars.popoverThread.composer.padding,
    gap: vars.popoverThread.composer.gap,
  },
]);

export const composerContentEditable = style([
  composerStyles.contentEditable,
  {
    border: vars.popoverThread.composer.contentEditable.border,
    minHeight: vars.popoverThread.composer.contentEditable.minHeight,

    selectors: {
      '&:focus': {
        borderColor: vars.popoverThread.composer.contentEditable.focus.border,
      },
    },
  },
]);
