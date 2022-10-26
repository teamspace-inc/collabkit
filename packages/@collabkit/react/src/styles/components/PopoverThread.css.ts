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
  color: 'red',
  height: '100%',
  position: 'relative',
  width: fallbackVar(vars.popoverThread.width, '272px'),
  border: fallbackVar(vars.popoverThread.border, 'none'),
  boxShadow: fallbackVar(vars.popoverThread.boxShadow, vars.shadow.high),
  borderRadius: fallbackVar(vars.popoverThread.borderRadius, vars.space[3]),
  fontFamily: vars.fontFamily,
});

// these need to go inside the scrollarea
// but root is outside it, so we split them out and
// apply them using separate 'spacer' divs at the top and
// bottom of PopoverThread
export const spacerTop = style({
  paddingTop: fallbackVar(vars.popoverThread.paddingTop, `0`),
});

export const spacerBottom = style({
  paddingBottom: fallbackVar(vars.popoverThread.paddingBottom, vars.space[4]),
});

export const previewRoot = style([
  root,
  {
    boxShadow: fallbackVar(vars.popoverThread.preview.boxShadow, vars.shadow.standard),
    cursor: 'pointer',
    padding: `${vars.space[4]} 0`,
  },
]);

export const reply = style({
  marginTop: '2px',
  color: fallbackVar(vars.popoverThread.preview.reply.color, vars.color.textSecondary),
  fontSize: fallbackVar(vars.popoverThread.preview.reply.fontSize, vars.text.base.fontSize),
  lineHeight: fallbackVar(vars.popoverThread.preview.reply.lineHeight, vars.text.base.lineHeight),
  fontWeight: fallbackVar(vars.popoverThread.preview.reply.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(
    vars.popoverThread.preview.reply.letterSpacing,
    vars.text.base.letterSpacing
  ),
  fontFamily: vars.fontFamily,
});

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

export const commentNameAndTimestampWrapper = style([
  commentStyles.nameAndTimestampWrapper,
  {
    // flexDirection: 'column',
    // gap: vars.space[0],
  },
]);

export const composerRoot = composerStyles.root;

export const composerForm = style({
  borderTop: fallbackVar(vars.popoverThread.composer.form.borderTop, 'none'),
  display: 'flex',
  flexDirection: 'column',
  padding: fallbackVar(vars.popoverThread.composer.form.padding, `0 ${vars.space[4]} 0`),
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
