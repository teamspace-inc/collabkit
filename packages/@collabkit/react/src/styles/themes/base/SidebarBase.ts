import { vars } from '../../theme';

export const SidebarBase = {
  sidebar: {
    boxShadow: vars.shadow.high,
    background: vars.color.background,
    title: {
      fontSize: vars.text.large.fontSize,
      lineHeight: vars.text.large.lineHeight,
      letterSpacing: vars.text.large.letterSpacing,
      color: vars.color.textPrimary,
      fontWeight: vars.fontWeight.bold,
      paddingTop: vars.space[4],
      paddingBottom: vars.space[2],
      borderBottom: `none`,
    },
  },
};
