import { style } from '@vanilla-extract/css';
import { vars } from './themes.css';

export const avatar = style({
  width: vars.profile.avatar.width,
  height: vars.profile.avatar.height,
  borderRadius: vars.profile.avatar.borderRadius,
  fontSize: vars.profile.avatar.fontSize,
  lineHeight: vars.profile.avatar.height,
  color: vars.profile.avatar.color,
  flexShrink: 0,
  fontWeight: '700',
  textAlign: 'center',
  verticalAlign: 'middle',
  cursor: 'inherit',
  userSelect: 'none',
});

export const name = style({
  color: vars.profile.name.color,
  fontSize: vars.profile.name.fontSize,
  lineHeight: vars.profile.name.lineHeight,
  fontWeight: vars.profile.name.fontWeight,
});
