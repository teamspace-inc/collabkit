import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const avatarSize = fallbackVar(vars.avatar.size, '24px');

export const avatar = style({
  width: avatarSize,
  height: avatarSize,
  borderRadius: vars.profile.avatar.borderRadius,
  fontSize: fallbackVar(vars.profile.avatar.fontSize, vars.avatar.fontSize),
  lineHeight: avatarSize,
  color: fallbackVar(vars.profile.avatar.color, vars.color.background),
  flexShrink: 0,
  background: vars.profile.avatar.background,
  fontWeight: fallbackVar(vars.profile.avatar.fontWeight, vars.fontWeight.bold),
  textAlign: 'center',
  verticalAlign: 'middle',
  cursor: 'inherit',
  boxSizing: 'border-box',
  userSelect: 'none',
  fontFamily: vars.fontFamily,
  textTransform: 'uppercase',
});

export const name = style({
  color: fallbackVar(vars.profile.name.color, vars.color.textPrimary),
  fontSize: fallbackVar(vars.profile.name.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.profile.name.fontWeight, vars.fontWeight.bold),
  lineHeight: fallbackVar(vars.profile.name.lineHeight, vars.text.base.lineHeight),
  letterSpacing: fallbackVar(vars.profile.name.letterSpacing, vars.text.base.letterSpacing),
  fontFamily: vars.fontFamily,
  textTransform: 'capitalize',
});

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: fallbackVar(vars.profile.gap, vars.space[2]),
});
