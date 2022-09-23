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
  gap: 12,
  lineHeight: '160%',
});

export const composer = style([
  composerStyles.root,
  {
    borderTop: '1px solid #E3E9ED',
    alignItems: 'flex-end',
    padding: 16,
    gap: '12px',
  },
]);

export const composerContentEditable = style([
  composerStyles.contentEditable,
  {
    border: '1px solid #E3E9ED',
    minHeight: 40,

    selectors: {
      '&:focus': {
        borderColor: '#36B374',
      },
    },
  },
]);
