import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';
import { collabkit } from './Root.css';

export const paddingLeft = fallbackVar(vars.comment.paddingLeft, vars.space[4]);
export const paddingRight = fallbackVar(vars.comment.paddingRight, vars.space[4]);
export const headerGap = fallbackVar(vars.comment.header.gap, vars.space[2]);
export const actionsGap = fallbackVar(vars.comment.actions.gap, vars.space[2]);

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

export const content = style({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  flex: '1',
  gap: fallbackVar(vars.comment.content.gap, vars.space[0]),
  fontFamily: vars.fontFamily,
});

export const indent = style({
  marginLeft: calc.add(vars.avatar.size, fallbackVar(vars.comment.gap, vars.space[2])),
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

export const editor = style([
  {
    display: 'flex',
    flexDirection: 'column',
    gap: vars.space[1],
    marginTop: '0px',
    marginRight: '-16px',
    marginLeft: '16px',
    fontFamily: vars.fontFamily,
  },
]);

export const header = style({
  flex: '1',
  gap: fallbackVar(vars.comment.header.gap, vars.space[2]),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  fontFamily: vars.fontFamily,
  position: 'relative',
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
  flexDirection: 'row',
  zIndex: 2, // higher than scrollbar
  fontFamily: vars.fontFamily,
  position: 'absolute',
  right: '0px',
  top: '0px',
  background: vars.color.surfaceOverlay,
  borderRadius: '6px',
});

export const root = style({
  flex: '1',
  flexDirection: 'row',
  gap: fallbackVar(vars.comment.gap, vars.space[2]),
  position: 'relative',
  // account for scrollbar
  // maxWidth: calc.subtract('100%', vars.space[2]),
  paddingLeft: fallbackVar(vars.comment.paddingLeft, vars.space[4]),
  paddingRight: fallbackVar(vars.comment.paddingRight, vars.space[4]),
  paddingTop: fallbackVar(vars.comment.paddingTop, vars.space[1]),
  paddingBottom: fallbackVar(vars.comment.paddingBottom, vars.space[1]),
  fontFamily: vars.fontFamily,
  display: 'flex',

  selectors: {
    '&:hover': {
      backgroundColor: fallbackVar(vars.comment.hover.background, 'none'),
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
