import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme';
import * as composerStyles from './Composer.css';
import * as commentStyles from './Comment.css';
import { recipe } from '@vanilla-extract/recipes';

export const root = style({
  boxSizing: 'border-box',
  backgroundColor: fallbackVar(vars.popoverThread.background, vars.color.background),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  padding: fallbackVar(vars.popoverThread.padding, vars.space[0]),
  width: fallbackVar(vars.popoverThread.width, '264px'),
  border: fallbackVar(vars.popoverThread.border, 'none'),
  boxShadow: fallbackVar(vars.popoverThread.boxShadow, vars.shadow.high),
  borderRadius: fallbackVar(vars.popoverThread.borderRadius, vars.space[3]),
});

export const previewRoot = style([
  root,
  {
    boxShadow: fallbackVar(vars.popoverThread.preview.boxShadow, vars.shadow.standard),
    cursor: 'pointer',
  },
]);

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

export const commentHeader = recipe({
  base: {
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
    gap: fallbackVar(vars.comment.header.gap, vars.space[2]),
    alignItems: 'flex-start',
  },
  variants: {},
});

export const composer = style([
  composerStyles.root,
  {
    borderTop: fallbackVar(vars.popoverThread.composer.borderTop, 'none'),
    alignItems: 'flex-end',
    padding: fallbackVar(
      vars.popoverThread.composer.padding,
      `0px ${vars.space[4]} ${vars.space[4]} ${vars.space[4]}`
    ),
    gap: fallbackVar(vars.popoverThread.composer.gap, vars.space[2]),
  },
]);

export const composerContentEditable = style([
  composerStyles.contentEditable({ disabled: false }),
  {
    border: fallbackVar(
      vars.popoverThread.composer.contentEditable.border,
      `1px solid ${vars.color.border}`
    ),
    minHeight: fallbackVar(vars.popoverThread.composer.contentEditable.minHeight, '40px'),

    selectors: {
      '&:focus': {
        borderColor: fallbackVar(
          vars.popoverThread.composer.contentEditable.focus.border,
          `1px solid ${vars.color.border}`
        ),
      },
    },
  },
]);
