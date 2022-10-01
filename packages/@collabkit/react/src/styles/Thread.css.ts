import { createVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from './themes.css';

export const root = style({
  display: 'flex',
  height: '100%',
  position: 'relative',
  flex: '1',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  overflow: 'hidden',
  background: vars.thread.background,
  border: vars.thread.border,
  borderRadius: vars.thread.borderRadius,
  boxShadow: vars.thread.boxShadow,
});

export const header = style({
  padding: '20px 16px',
  display: 'flex',
  color: vars.thread.header.color,
  fontSize: vars.thread.header.fontSize,
  fontWeight: vars.thread.header.fontWeight,
  lineHeight: vars.thread.header.lineHeight,
});

export const commentList = style({
  paddingBottom: vars.space[2],
});

const columnGap = createVar();
const composerHorizontalPadding = createVar();

export const composer = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  columnGap: columnGap,
  padding: `0 ${composerHorizontalPadding}`,

  vars: {
    [composerHorizontalPadding]: vars.space[4],
    [columnGap]: vars.space[2],
  },
});

export const typingIndicator = style({
  height: vars.thread.typingIndicator.lineHeight,
  paddingLeft: calc.add(vars.profile.avatar.width, columnGap),
  overflow: 'hidden',
  flexBasis: '100%',
  color: vars.thread.typingIndicator.color,
  fontSize: vars.thread.typingIndicator.fontSize,
  lineHeight: vars.thread.typingIndicator.lineHeight,
});

export const emptyState = style({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: vars.space[2],
  fontWeight: '400',
  fontSize: vars.text.small.fontSize,
  lineHeight: vars.text.small.lineHeight,
  color: vars.color.textSecondary,
});
