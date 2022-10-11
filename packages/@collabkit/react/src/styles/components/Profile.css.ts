import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme';

export const avatar = style({
  width: vars.avatar.size,
  height: vars.avatar.size,
  borderRadius: vars.profile.avatar.borderRadius,
  fontSize: fallbackVar(vars.profile.avatar.fontSize, vars.avatar.fontSize),
  lineHeight: vars.avatar.size,
  color: fallbackVar(vars.profile.avatar.color, vars.color.background),
  flexShrink: 0,
  background: vars.profile.avatar.background,
  fontWeight: fallbackVar(vars.profile.avatar.fontWeight, vars.fontWeights.bold),
  textAlign: 'center',
  verticalAlign: 'middle',
  cursor: 'inherit',
  boxSizing: 'border-box',
  userSelect: 'none',
});

export const name = style({
  color: fallbackVar(vars.profile.name.color, vars.color.textPrimary),
  fontSize: fallbackVar(vars.profile.name.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.profile.name.fontWeight, vars.fontWeights.bold),
  lineHeight: fallbackVar(vars.profile.name.lineHeight, vars.text.base.lineHeight),
  letterSpacing: fallbackVar(vars.profile.name.letterSpacing, vars.text.base.letterSpacing),
});
