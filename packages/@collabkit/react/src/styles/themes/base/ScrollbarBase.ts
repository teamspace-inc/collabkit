import { vars } from '../../theme';

export const ScrollbarBase = {
  scrollbar: {
    thumb: {
      background: 'hsl(0, 0%, 30%)',
      width: '6px',
      borderRadius: '12px',
    },
    padding: '4px',
    background: 'transparent',
    hover: {
      background: vars.color.surfaceOverlay,
    },
    borderRadius: '0px 3px 3px 0px',
  },
};
