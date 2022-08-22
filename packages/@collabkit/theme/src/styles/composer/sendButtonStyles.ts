import { css } from '@stitches/react';

export const button = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '$sizes$sendButton',
  height: '$sizes$sendButton',
  position: 'absolute',
  right: 'calc($padding$composer + 12px)',
  top: '$offsets$composerSendButtonTop',
  borderRadius: '$sizes$sendButton',
  border: 'none',

  background: 'none',
  padding: 0,
  cursor: 'pointer',

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

export const icon = css({
  position: 'relative',
  cursor: 'pointer',
});
