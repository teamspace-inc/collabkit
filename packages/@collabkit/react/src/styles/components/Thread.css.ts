import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';

export const root = style({
  display: 'flex',
  height: '100%',
  position: 'relative',
  flex: '1',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  overflow: 'hidden',
  background: fallbackVar(vars.thread.background, vars.color.background),
  border: fallbackVar(vars.thread.border, 'none'),
  borderRadius: fallbackVar(vars.thread.borderRadius, vars.space[3]),
  boxShadow: fallbackVar(vars.thread.boxShadow, 'none'),
  paddingTop: vars.space[2],
  textAlign: 'left',
  minWidth: '240px',
});

export const header = style({
  padding: '0px 16px 20px',
  display: 'flex',
  color: fallbackVar(vars.thread.header.color, vars.color.textPrimary),
  fontSize: fallbackVar(vars.thread.header.fontSize, vars.text.large.fontSize),
  fontWeight: fallbackVar(vars.thread.header.fontWeight, vars.fontWeight.bold),
  lineHeight: fallbackVar(vars.thread.header.lineHeight, vars.text.large.lineHeight),
  letterSpacing: fallbackVar(vars.thread.header.letterSpacing, vars.text.large.letterSpacing),
});

export const commentList = style({
  paddingBottom: vars.space[2],
});

const columnGap = createVar();
const composerHorizontalPadding = createVar();

const typingIndicatorLineHeight = fallbackVar(
  vars.thread.typingIndicator.lineHeight,
  vars.text.small.lineHeight
);

export const composer = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  columnGap: columnGap,
  padding: `0 ${composerHorizontalPadding} ${typingIndicatorLineHeight}`,

  vars: {
    [composerHorizontalPadding]: vars.space[4],
    [columnGap]: vars.space[2],
  },
});

export const typingIndicator = style({
  height: fallbackVar(vars.thread.typingIndicator.lineHeight),
  paddingLeft: calc.add(vars.avatar.size, columnGap),
  paddingTop: calc.divide(vars.space[1]),
  overflow: 'hidden',
  flexBasis: '100%',
  color: fallbackVar(vars.thread.typingIndicator.color, vars.color.textSecondary),
  fontSize: fallbackVar(vars.thread.typingIndicator.fontSize, vars.text.small.fontSize),
  lineHeight: typingIndicatorLineHeight,
  letterSpacing: fallbackVar(
    vars.thread.typingIndicator.letterSpacing,
    vars.text.small.letterSpacing
  ),
});

export const emptyState = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: vars.space[2],
  fontWeight: vars.fontWeight.regular,
  fontSize: vars.text.small.fontSize,
  lineHeight: vars.text.small.lineHeight,
  color: vars.color.textSecondary,
  letterSpacing: vars.text.small.letterSpacing,
});
