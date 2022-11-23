import { vars } from '../../theme/index.css';

export const MenuBase = {
  menu: {
    background: vars.color.surface,
    border: 'none',
    borderRadius: '6px',
    boxShadow: vars.shadow.standard,
    item: {
      color: vars.color.textPrimary,
      fontSize: vars.text.base.fontSize,
      fontWeight: vars.fontWeight.regular,
      letterSpacing: vars.text.base.letterSpacing,
      lineHeight: vars.text.base.lineHeight,
      active: {
        color: vars.color.textPrimary,
        background: vars.color.surfaceOverlay,
      },
      hover: {
        color: vars.color.textPrimary,
        background: vars.color.surfaceOverlay,
      },
    },
  },
};
