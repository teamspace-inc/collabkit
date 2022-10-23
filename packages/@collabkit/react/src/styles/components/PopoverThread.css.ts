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
  fontFamily: vars.fontFamily,
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
    alignItems: fallbackVar(vars.popoverThread.comment.header.alignItems, 'flex-start'),
    fontFamily: vars.fontFamily,
  },
  variants: {},
});

export const composerRoot = composerStyles.root;

export const composerForm = style({
  borderTop: fallbackVar(vars.popoverThread.composer.form.borderTop, 'none'),
  display: 'flex',
  flexDirection: 'column',
  padding: fallbackVar(
    vars.popoverThread.composer.form.padding,
    `0 ${vars.space[4]} ${vars.space[3]}`
  ),
  gap: fallbackVar(vars.popoverThread.composer.form.gap, vars.space[2]),
  fontFamily: vars.fontFamily,
});

export const composerInput = style([
  composerStyles.input({ disabled: false }),
  {
    border: fallbackVar(vars.popoverThread.composer.input.border, `1px solid ${vars.color.border}`),
    minHeight: fallbackVar(vars.popoverThread.composer.input.minHeight, '40px'),
    fontFamily: vars.fontFamily,
    selectors: {
      '&:focus': {
        borderColor: fallbackVar(
          vars.popoverThread.composer.input.focus.border,
          `1px solid ${vars.color.border}`
        ),
      },
    },
  },
]);
