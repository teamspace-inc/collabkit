import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from './themes.css';

export const root = recipe({
  base: {
    display: 'flex',
    flex: '1',
    gap: vars.space[2],
    position: 'relative',
    maxWidth: calc.subtract('100%', vars.space[2]),
    paddingTop: vars.comment.paddingTop,
    paddingBottom: vars.comment.paddingBottom,
    paddingLeft: vars.comment.paddingLeft,
    paddingRight: vars.comment.paddingBottom,

    selectors: {
      '&:hover': {
        backgroundColor: vars.comment.hover.background,
      },
    },
  },

  variants: {
    type: {
      inline: {
        paddingTop: calc.divide(vars.comment.paddingTop, 2),
        paddingBottom: calc.divide(vars.comment.paddingBottom, 2),
      },
      'inline-start': {
        paddingTop: calc.divide(vars.comment.paddingTop, 2),
        paddingBottom: calc.divide(vars.comment.paddingBottom, 2),
      },
      'inline-end': {
        paddingTop: calc.divide(vars.comment.paddingTop, 2),
        paddingBottom: calc.divide(vars.comment.paddingBottom, 2),
      },
      default: {},
    },
  },
});

export const nameAndTimestampWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

export const content = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    flex: '1',
    gap: vars.space[2],
  },
  variants: {
    // indents the comment to account
    // for a profile image
    profileIndent: {
      true: {
        marginLeft: calc.add(vars.profile.avatar.width, vars.space[2]),
      },
      false: {},
    },
  },
});

export const body = style({
  position: 'relative',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  color: vars.comment.body.color,
  fontSize: vars.comment.body.fontSize,
  lineHeight: vars.comment.body.lineHeight,
});

export const editor = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  margin: '0px -16px',
});

export const header = style({
  display: 'flex',
  flex: '1',
  gap: '4px',
  flexDirection: 'row',
  alignItems: 'baseline',
});

export const timestamp = style({
  textDecoration: 'none',
  fontWeight: '400',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: vars.comment.timestamp.color,
  fontSize: vars.comment.timestamp.fontSize,
  lineHeight: vars.comment.timestamp.lineHeight,
});

export const actions = style({
  display: 'flex',
  gap: vars.space[1],
  flexDirection: 'row',
});

export const menu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  cursor: 'pointer',
  pointerEvents: 'all',
  minWidth: 110,
  borderRadius: vars.space[1],
  background: vars.comment.menu.background,
  outline: 'none',

  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const menuItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  border: 'none',
  textAlign: 'left',
  margin: 0,
  outline: 0,
  padding: `${vars.space[1]} ${vars.space[2]}`,
  borderRadius: vars.space[1],
  background: vars.comment.menu.background,
  color: vars.comment.menu.color,
  fontSize: vars.comment.menu.fontSize,
  lineHeight: vars.comment.menu.lineHeight,

  selectors: {
    '&:focus, &:not([disabled]):active': {
      color: vars.comment.menu.active.color,
      background: vars.comment.menu.active.background,
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
});
