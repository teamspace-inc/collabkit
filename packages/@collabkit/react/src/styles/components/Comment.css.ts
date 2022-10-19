import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';
import { collabkit } from './Root.css';

export const root = recipe({
  base: {
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
    gap: vars.space[2],
    position: 'relative',
    maxWidth: calc.subtract('100%', vars.space[2]),
    paddingTop: fallbackVar(vars.comment.paddingTop, vars.space[2]),
    paddingBottom: fallbackVar(vars.comment.paddingBottom, vars.space[2]),
    paddingLeft: fallbackVar(vars.comment.paddingLeft, vars.space[4]),
    paddingRight: fallbackVar(vars.comment.paddingBottom, vars.space[4]),

    selectors: {
      '&:hover': {
        backgroundColor: fallbackVar(vars.comment.hover.background, 'none'),
      },
    },
  },

  variants: {
    type: {
      inline: {
        paddingTop: fallbackVar(vars.comment.paddingTop, vars.space[1]),
        paddingBottom: fallbackVar(vars.comment.paddingBottom, vars.space[1]),
      },
      'inline-start': {
        paddingTop: fallbackVar(vars.comment.paddingTop, vars.space[1]),
        paddingBottom: fallbackVar(vars.comment.paddingBottom, vars.space[1]),
      },
      'inline-end': {
        paddingTop: fallbackVar(vars.comment.paddingTop, vars.space[1]),
        paddingBottom: fallbackVar(vars.comment.paddingBottom, vars.space[1]),
      },
      default: {},
    },
  },
});

export const nameAndTimestampWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline',
  gap: fallbackVar(vars.comment.header.nameAndTimestamp.gap, `${calc(vars.space[1]).divide(2)}`),
});

export const inlineModal = style({
  background: vars.color.surface,
  borderRadius: '6px',
});

export const content = recipe({
  base: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    flex: '1',
    gap: fallbackVar(vars.comment.content.gap, vars.space[3]),
  },
  variants: {
    // indents the comment to account
    // for a profile image
    profileIndent: {
      true: {
        marginLeft: calc.add(vars.avatar.size, vars.space[2]),
      },
      false: {},
    },
  },
});

export const body = style({
  fontSize: fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing),
  lineHeight: fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight),

  position: 'relative',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  minHeight: fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight), // prevents flicker
  color: fallbackVar(vars.comment.body.color, vars.color.textPrimary),
});

export const editor = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  margin: '0px -16px',
});

export const header = style({
  flex: '1',
  gap: fallbackVar(vars.comment.header.gap, vars.space[2]),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
});

export const timestamp = style({
  fontSize: fallbackVar(vars.comment.timestamp.fontSize, vars.text.small.fontSize),
  fontWeight: fallbackVar(vars.comment.timestamp.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.comment.timestamp.letterSpacing, vars.text.small.letterSpacing),
  lineHeight: fallbackVar(vars.comment.timestamp.lineHeight, vars.text.small.lineHeight),

  textDecoration: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: fallbackVar(vars.comment.timestamp.color, vars.color.textSecondary),
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
  borderRadius: fallbackVar(vars.menu.borderRadius, vars.space[1]),
  background: fallbackVar(vars.menu.background, vars.color.surface),
  boxShadow: fallbackVar(vars.menu.boxShadow, vars.shadow.standard),
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
  background: fallbackVar(vars.menu.background, vars.color.surface),
  color: fallbackVar(vars.menu.item.color, vars.color.textPrimary),
  fontSize: fallbackVar(vars.menu.item.fontSize, vars.text.small.fontSize),
  lineHeight: fallbackVar(vars.menu.item.lineHeight, vars.text.small.lineHeight),
  fontWeight: fallbackVar(vars.menu.item.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.menu.item.letterSpacing, vars.text.small.letterSpacing),

  selectors: {
    '&:focus, &:not([disabled]):active': {
      color: fallbackVar(vars.menu.item.active.color, vars.color.textPrimary),
      background: fallbackVar(vars.menu.item.active.background, vars.color.surfaceOverlay),
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
globalStyle(`${collabkit} ${markdown} p`, {
  margin: '0',
  padding: '0',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)}`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)}`,
  color: `${fallbackVar(vars.comment.body.color, vars.color.textPrimary)}`,
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)}`,
  letterSpacing: `${fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing)}`,
});

globalStyle(`${collabkit} ${markdown} a`, {
  textDecoration: 'none',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)}`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}`,
});

globalStyle(`${collabkit} ${markdownLinksNotClickable} p`, {
  margin: '0',
  padding: '0',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)}`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)}`,
  color: fallbackVar(vars.comment.body.color, vars.color.textPrimary),
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)}`,
  letterSpacing: `${fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing)}`,
});

globalStyle(`${collabkit} ${markdownLinksNotClickable} a`, {
  textDecoration: 'none',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)}`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}`,
  cursor: 'default',
});
