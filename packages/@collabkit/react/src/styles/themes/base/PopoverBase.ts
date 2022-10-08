import { vars } from '../../theme';

export const PopoverThreadBase = {
  popoverThread: {
    background: vars.color.background,
    border: 'none',
    borderRadius: vars.space[3],
    boxShadow: vars.shadow.high,
    width: '264px',
    padding: '0px',
    preview: {
      boxShadow: vars.shadow.standard,
    },
    composer: {
      borderTop: `0px solid ${vars.color.border}`,
      alignItems: 'flex-end',
      padding: `0px ${vars.space[4]} ${vars.space[4]} ${vars.space[4]}`,
      gap: vars.space[2],
      contentEditable: {
        border: `1px solid ${vars.color.border}`,
        minHeight: '40px',
        focus: {
          border: `1px solid ${vars.color.border}`,
        },
      },
    },
  },
};
