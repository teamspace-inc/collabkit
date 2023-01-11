import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

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
  borderRadius: fallbackVar(vars.thread.borderRadius, vars.space[0]),
  boxShadow: fallbackVar(vars.thread.boxShadow, 'none'),
  textAlign: 'left',
  minWidth: '240px',
  fontFamily: vars.fontFamily,
});

export const header = style({
  padding: `${vars.space[4]} ${vars.space[4]} ${vars.space[4]}`,
  display: 'flex',
  color: fallbackVar(vars.thread.header.color, vars.color.textPrimary),
  fontSize: fallbackVar(vars.thread.header.fontSize, vars.text.large.fontSize),
  fontWeight: fallbackVar(vars.thread.header.fontWeight, vars.fontWeight.bold),
  lineHeight: fallbackVar(vars.thread.header.lineHeight, vars.text.large.lineHeight),
  letterSpacing: fallbackVar(vars.thread.header.letterSpacing, vars.text.large.letterSpacing),
  fontFamily: vars.fontFamily,
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
  fontFamily: vars.fontFamily,
});
