import { vars } from '../../theme';

export const ProfileBase = {
  profile: {
    avatar: {
      width: vars.avatar.size,
      height: vars.avatar.size,
      borderRadius: '50%',
      fontSize: vars.avatar.fontSize,
      color: vars.color.background,
      background: 'hsl(0, 0%, 60%)',
      fontWeight: vars.fontWeights.bold,
    },

    name: {
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      fontWeight: vars.fontWeights.bold,
      lineHeight: vars.text.base.lineHeight,
      letterSpacing: vars.text.base.letterSpacing,
    },
  },
};
