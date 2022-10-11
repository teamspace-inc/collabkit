import { style } from '@vanilla-extract/css';
import { vars } from '../theme';

export const avatar = style({
  width: vars.avatar.size,
  height: vars.avatar.size,
  borderRadius: vars.profile.avatar.borderRadius,
  fontSize: vars.profile.avatar.fontSize,
  lineHeight: vars.avatar.size,
  color: vars.profile.avatar.color,
  flexShrink: 0,
  background: vars.profile.avatar.background,
  fontWeight: vars.fontWeights.bold,
  textAlign: 'center',
  verticalAlign: 'middle',
  cursor: 'inherit',
  boxSizing: 'border-box',
  userSelect: 'none',
});

export const name = style({
  color: vars.profile.name.color,
  fontSize: vars.profile.name.fontSize,
  lineHeight: vars.profile.name.lineHeight,
  fontWeight: vars.profile.name.fontWeight,
  letterSpacing: vars.profile.name.letterSpacing,
});
