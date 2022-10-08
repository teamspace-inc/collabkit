import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';
export const root = recipe({
  base: {
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
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
  display: vars.comment.header.nameAndTimestamp.display,
  flexDirection: vars.comment.header.nameAndTimestamp.flexDirection,
  gap: vars.comment.header.nameAndTimestamp.gap,
});

export const inlineModal = style({
  background: vars.color.surface,
  borderRadius: '6px',
  // padding: `${vars.space[1]} ${vars.space[2]}`,
});

export const content = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    flex: '1',
    gap: vars.comment.content.gap,
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
  fontSize: vars.comment.body.fontSize,
  fontWeight: vars.comment.body.fontWeight,
  letterSpacing: vars.comment.body.letterSpacing,
  lineHeight: vars.comment.body.lineHeight,

  position: 'relative',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  minHeight: vars.comment.body.lineHeight, // prevents flicker
  color: vars.comment.body.color,
});

export const editor = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  margin: '0px -16px',
});

export const header = style({
  flex: '1',
  gap: vars.comment.header.gap,
  display: vars.comment.header.display,
  flexDirection: vars.comment.header.flexDirection,
  alignItems: vars.comment.header.alignItems,
  justifyContent: vars.comment.header.justifyContent,
});

// export const headerProfile = style({
//   display: vars.comment.header.profile.display,
//   flexDirection: vars.comment.header.profile.flexDirection,
//   gap: vars.comment.header.profile.gap,
//   alignItems: vars.comment.header.profile.alignItems,
//   flex: 1,
// });

export const timestamp = style({
  fontSize: vars.comment.timestamp.fontSize,
  fontWeight: vars.comment.timestamp.fontWeight,
  letterSpacing: vars.comment.timestamp.letterSpacing,
  lineHeight: vars.comment.timestamp.lineHeight,

  textDecoration: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: vars.comment.timestamp.color,
});

export const actions = style({
  display: 'flex',
  gap: vars.space[1],
  flexDirection: 'row',
  zIndex: 2, // higher than scrollbar
});

export const menu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  cursor: 'pointer',
  pointerEvents: 'all',
  minWidth: 110,
  borderRadius: vars.space[1],
  background: vars.menu.background,
  boxShadow: vars.shadow.standard,
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
  cursor: 'pointer',
  background: vars.menu.background,
  color: vars.menu.item.color,
  fontSize: vars.menu.item.fontSize,
  lineHeight: vars.menu.item.lineHeight,
  fontWeight: vars.menu.item.fontWeight,
  letterSpacing: vars.menu.item.letterSpacing,

  selectors: {
    '&:focus, &:not([disabled]):active': {
      color: vars.menu.item.active.color,
      background: vars.menu.item.active.background,
    },
    '&:not(:first-of-type)': {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
});

export const markdown = style({});
export const markdownLinksNotClickable = style({});

// since we are using a globalStyle we need to override any
// app specific styles
globalStyle(`${markdown} p`, {
  margin: '0 !important',
  padding: '0 !important',
  fontSize: `${vars.comment.body.fontSize} !important`,
  fontWeight: `${vars.comment.body.fontWeight} !important`,
  color: `${vars.comment.body.color} !important`,
  lineHeight: `${vars.comment.body.lineHeight} !important`,
  letterSpacing: `${vars.comment.body.letterSpacing} !important`,
});

globalStyle(`${markdown} a`, {
  textDecoration: 'none !important',
  fontWeight: `${vars.mentions.pill.fontWeight} !important`,
  color: `${vars.mentions.pill.color} !important`,
});

globalStyle(`${markdownLinksNotClickable} p`, {
  margin: '0 !important',
  padding: '0 !important',
  fontSize: `${vars.comment.body.fontSize} !important`,
  fontWeight: `${vars.comment.body.fontWeight} !important`,
  color: `${vars.comment.body.color} !important`,
  lineHeight: `${vars.comment.body.lineHeight} !important`,
  letterSpacing: `${vars.comment.body.letterSpacing} !important`,
});

globalStyle(`${markdownLinksNotClickable} a`, {
  textDecoration: 'none !important',
  fontWeight: `${vars.mentions.pill.fontWeight} !important`,
  color: `${vars.mentions.pill.color} !important`,
  cursor: 'default !important',
});
