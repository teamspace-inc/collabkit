import { style, fallbackVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  marginLeft: `${calc(fallbackVar(vars.facepile.overlap, '4px'))}`,
});

export const avatarWrap = recipe({
  base: {
    border: `${calc(fallbackVar(vars.facepile.avatar.borderSize, '2px'))} solid ${fallbackVar(
      vars.facepile.avatar.borderColor,
      vars.color.background
    )}`,
    marginLeft: `${calc(fallbackVar(vars.facepile.overlap, '4px'))
      .negate()
      .subtract(fallbackVar(vars.facepile.avatar.borderSize, '2px'))}`,
    borderRadius: '50%',
  },
  variants: {
    hover: {
      true: {
        borderColor: fallbackVar(vars.facepile.avatar.hover.borderColor, vars.color.surface),
      },
    },
  },
});
