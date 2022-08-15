import { css } from '@stitches/react';

export const button = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '$sizes$sendButton',
  height: '$sizes$sendButton',
  position: 'absolute',
  right: 'calc($padding$composer + 12px)',
  top: '$padding$composer',
  borderRadius: '$sizes$sendButton',
  border: 'none',

  variants: {
    disabled: {
      true: {
        opacity: 0,
      },
      false: {
        backgroundColor: '$colors$sendButtonColor',
      },
    },
  },
});
