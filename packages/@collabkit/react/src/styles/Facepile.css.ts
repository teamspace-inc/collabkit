import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from './themes.css';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  marginLeft: `${calc(vars.facepile.gap).negate()}`,
});

export const avatarWrap = style({
  border: `${calc(vars.facepile.avatar.borderSize)} solid ${vars.color.background}`,
  marginLeft: `${calc(vars.facepile.gap).subtract(vars.facepile.avatar.borderSize)}`,
  borderRadius: '50%',
});
