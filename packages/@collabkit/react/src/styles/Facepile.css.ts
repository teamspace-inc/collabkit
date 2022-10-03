import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from './themes.css';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  marginLeft: `${calc(vars.facepile.gap).negate()}`,
});

export const avatarWrap = recipe({
  base: {
    border: `${calc(vars.facepile.avatar.borderSize)} solid ${vars.facepile.avatar.borderColor}`,
    marginLeft: `${calc(vars.facepile.gap).subtract(vars.facepile.avatar.borderSize)}`,
    borderRadius: '50%',
  },
  variants: {
    hover: {
      true: {
        borderColor: vars.facepile.avatar.hover.borderColor,
      },
    },
  },
});
