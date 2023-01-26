import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';
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
  marginBottom: vars.space[1],
});

export const inlineModal = style({
  background: vars.color.surface,
  borderRadius: '6px',
});

export const indent = style({
  marginLeft: calc.add(vars.avatar.size, fallbackVar(vars.comment.gap, vars.space[2])),
});

<<<<<<< HEAD
export const pin = style({
  paddingRight: vars.space[1],
  float: 'left',
=======
export const pin = recipe({
  base: {
    flex: '0 0 16px',
  },
>>>>>>> f75847ba (selecting wip)
});

export const body = style({
  fontSize: fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing),
  lineHeight: fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight),
  fontFamily: vars.fontFamily,
  gap: vars.space[1],
  textAlign: 'left',
  position: 'relative',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  minHeight: fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight), // prevents flicker
  color: fallbackVar(vars.comment.body.color, vars.color.textPrimary),

  // todo @nc: this should be adjusted automatically based on the space
  // available on the right
  paddingRight: `${calc(vars.space[3]).multiply(3)}`,
});

export const editor = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[2],
  marginRight: `${calc(paddingRight).negate()}`,
  fontFamily: vars.fontFamily,
  padding: `0 ${vars.space[4]} 0 0`,
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

const verticalPadding = calc.multiply(vars.space[1], 1.5).toString();

export const root = style({
  display: 'grid',
  gridTemplateColumns: `${vars.avatar.size} 1fr`,
  columnGap: fallbackVar(vars.comment.gap, vars.space[3]),
  position: 'relative',
  paddingLeft: fallbackVar(vars.comment.paddingLeft, vars.space[4]),
  paddingRight: fallbackVar(vars.comment.paddingRight, vars.space[4]),
  paddingTop: fallbackVar(vars.comment.paddingTop, verticalPadding),
  paddingBottom: fallbackVar(vars.comment.paddingBottom, verticalPadding),
  fontFamily: vars.fontFamily,
});

export const actions = style({
  display: 'flex',
  // gap: vars.space[1],
  flexDirection: 'row',
  zIndex: 2, // higher than scrollbar
  fontFamily: vars.fontFamily,
  position: 'absolute',
  right: vars.space[4],
  top: '2px',
  transform: 'translateY(0%)',
  background: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: '6px',

  opacity: 0,
});

export const hover = style({
  opacity: 1,
  pointerEvents: 'all',
});

globalStyle(`${collabkit} ${root}:hover`, {
  backgroundColor: fallbackVar(vars.comment.hover.background, vars.color.surfaceHover),
});

globalStyle(`${collabkit} ${root}${hover}`, {
  backgroundColor: fallbackVar(vars.comment.hover.background, vars.color.surfaceHover),
});

globalStyle(`${collabkit} ${root}${hover} ${actions}`, {
  opacity: 1,
  pointerEvents: 'all',
});

globalStyle(`${collabkit} ${root}:hover ${actions}`, {
  opacity: 1,
  pointerEvents: 'all',
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
