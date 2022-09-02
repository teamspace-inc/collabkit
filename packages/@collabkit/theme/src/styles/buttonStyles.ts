import { css } from '@stitches/react';

export const button = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '$fontSize$button',
  fontWeight: '$fontWeights$button',
  lineHeight: '$lineHeights$button',

  border: 'none',

  background: 'none',
  padding: '8px 12px',
  cursor: 'pointer',

  variants: {
    hasIcon: {
      true: {
        width: '$sizes$iconButton',
        height: '$sizes$iconButton',
        padding: 0,
        lineHeight: '$sizes$iconButton',
        borderRadius: '$radii$iconButton',
      },
    },
    hasText: {
      true: {
        padding: '8px 12px',
        outline: 'none',
        background: '$colors$buttonBackground',
        borderRadius: '$radii$0',
        color: '$colors$buttonText',
        fontWeight: '$fontWeights$button',
      },
    },
    type: {
      primary: {
        backgroundColor: '$colors$buttonPrimaryBackground',
        color: '$colors$buttonPrimaryText',
        // '&:hover': {
        //   backgroundColor: '$colors$buttonPrimaryHoverBackground',
        //   color: '$colors$buttonPrimaryHoverText',
        // },
        // '&:active': {
        //   backgroundColor: '$colors$buttonPrimaryActiveBackground',
        //   color: '$colors$buttonPrimaryActiveText',
        // },
      },
      secondary: {
        backgroundColor: '$colors$buttonSecondaryBackground',
        color: '$colors$buttonSecondaryText',
        // '&:hover': {
        //   backgroundColor: '$colors$buttonSecondaryHoverBackground',
        //   color: '$colors$buttonSecondaryHoverText',
        // },
        // '&:active': {
        //   backgroundColor: '$colors$buttonSecondaryActiveBackground',
        //   color: '$colors$buttonSecondaryActiveText',
        // },
      },
    },
    disabled: {
      true: {
        backgroundColor: '$colors$buttonDisabledBackground',
        color: '$colors$buttonDisabledText',
      },
    },
  },
});

export const icon = css({
  position: 'relative',
  cursor: 'pointer',
});
