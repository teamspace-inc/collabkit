import { css } from '@stitches/react';

export const button = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '$fontSize$sendButtonFontSize',
  position: 'relative',
  border: 'none',

  background: 'none',
  padding: 0,
  cursor: 'pointer',

  variants: {
    type: {
      icon: {
        width: '$sizes$sendButton',
        height: '$sizes$sendButton',
        borderRadius: '$sizes$sendButton',
      },
      text: {
        padding: '8px 12px',
        outline: 'none',
        background: '$colors$sendButtonBackground',
        borderRadius: '$radii$0',
        color: '$colors$sendButtonTextColor',
        fontWeight: '$fontWeights$sendButtonTextFontWeight',
      },
    },
    inset: {
      true: {
        position: 'absolute',
        right: '$offsets$composerSendButtonRight',
        top: '$offsets$composerSendButtonTop',
      },
    },
    disabled: {
      true: {
        backgroundColor: '$colors$sendButtonDisabledColor',
      },
      false: {
        backgroundColor: '$colors$sendButtonColor',
      },
    },
  },
  compoundVariants: [
    {
      type: 'text',
      disabled: true,
      css: {
        color: '$colors$sendButtonDisabledTextColor',
      },
    },
  ],
});

export const icon = css({
  cursor: 'pointer',
  color: '$colors$composerButtonIconColor',
});
