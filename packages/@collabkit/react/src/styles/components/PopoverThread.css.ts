import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../theme';
import * as commentStyles from './Comment.css';
import * as profileStyles from './Profile.css';
import { calc } from '@vanilla-extract/css-utils';
import { iconButtonWidth } from './IconButton.css';

const width = fallbackVar(vars.popoverThread.width, '264px');

export const root = style({
  boxSizing: 'border-box',
  backgroundColor: fallbackVar(vars.popoverThread.background, vars.color.background),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  padding: fallbackVar(vars.popoverThread.padding, vars.space[0]),
  width,
  border: fallbackVar(vars.popoverThread.border, 'none'),
  boxShadow: fallbackVar(vars.popoverThread.boxShadow, vars.shadow.high),
  borderRadius: fallbackVar(vars.popoverThread.borderRadius, vars.space[3]),
  fontFamily: vars.fontFamily,
});

// we want to target the comment name
globalStyle(`${root} ${profileStyles.name}`, {
  maxWidth: `${calc(calc.subtract(width, profileStyles.avatarSize)).subtract(
    calc(iconButtonWidth)
      .multiply(2)
      .add(commentStyles.paddingLeft)
      .add(commentStyles.paddingRight)
      .add(calc(commentStyles.headerGap).multiply(3))
  )} !important`,
  textOverflow: 'ellipsis !important',
  whiteSpace: 'nowrap',
  overflow: 'hidden !important',
});

export const previewRoot = style([
  root,
  {
    boxShadow: fallbackVar(vars.popoverThread.preview.boxShadow, vars.shadow.standard),
    cursor: 'pointer',
  },
]);
