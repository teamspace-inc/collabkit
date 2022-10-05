import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../../theme';

export const FacepileBase = {
  facepile: {
    gap: calc.negate('4px'),
    avatar: {
      size: vars.avatar.size,
      borderSize: '2px',
      borderColor: vars.color.background,
      hover: {
        borderColor: vars.color.surface,
      },
    },
  },
};
