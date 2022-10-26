import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';
import { collabkit } from './Root.css';

export const root = style({
  display: 'flex',
  flex: '1',
  flexDirection: 'row',
  gap: fallbackVar(vars.comment.gap, vars.space[2]),
  position: 'relative',
  // account for scrollbar
  // maxWidth: calc.subtract('100%', vars.space[2]),
  padding: fallbackVar(vars.comment.padding, `${vars.space[1]} ${vars.space[4]}`),
  fontFamily: vars.fontFamily,
  // borderBottom: `1px solid ${vars.color.surfaceOverlay}`,

  selectors: {
    '&:hover': {
      backgroundColor: fallbackVar(vars.comment.hover.background, 'none'),
    },
  },
});

export const nameAndTimestampWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: fallbackVar(vars.comment.header.nameAndTimestamp.gap, `${calc(vars.space[2])}`),
  fontFamily: vars.fontFamily,
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
    gap: fallbackVar(vars.comment.content.gap, vars.space[1]),
    fontFamily: vars.fontFamily,
  },
  variants: {
    // indents the comment to account
    // for a profile image
    profileIndent: {
      true: {
        marginLeft: calc.add(vars.avatar.size, fallbackVar(vars.comment.gap, vars.space[2])),
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
  fontFamily: vars.fontFamily,

  textAlign: 'left',
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
  fontFamily: vars.fontFamily,
});

export const header = style({
  flex: '1',
  gap: fallbackVar(vars.comment.header.gap, vars.space[2]),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  fontFamily: vars.fontFamily,
});

export const timestamp = style({
  fontSize: fallbackVar(vars.comment.timestamp.fontSize, vars.text.small.fontSize),
  fontWeight: fallbackVar(vars.comment.timestamp.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.comment.timestamp.letterSpacing, vars.text.small.letterSpacing),
  lineHeight: fallbackVar(vars.comment.timestamp.lineHeight, vars.text.small.lineHeight),
  fontFamily: vars.fontFamily,

  textDecoration: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: fallbackVar(vars.comment.timestamp.color, vars.color.textSecondary),
});

export const actions = style({
  display: 'flex',
  gap: vars.space[1],
  marginTop: `-4px`,
  flexDirection: 'row',
  zIndex: 2, // higher than scrollbar
  fontFamily: vars.fontFamily,
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
  fontFamily: vars.fontFamily,
});

globalStyle(`${collabkit} ${markdown} a`, {
  textDecoration: 'none',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)}`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}`,
  fontFamily: vars.fontFamily,
});

globalStyle(`${collabkit} ${markdownLinksNotClickable} p`, {
  margin: '0',
  padding: '0',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)}`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)}`,
  color: fallbackVar(vars.comment.body.color, vars.color.textPrimary),
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)}`,
  letterSpacing: `${fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing)}`,
  fontFamily: vars.fontFamily,
});

globalStyle(`${collabkit} ${markdownLinksNotClickable} a`, {
  textDecoration: 'none',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)}`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}`,
  cursor: 'default',
  fontFamily: vars.fontFamily,
});
