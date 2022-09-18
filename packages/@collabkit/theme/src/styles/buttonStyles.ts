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
        background: '$colors$buttonPrimaryBackground',
        color: '$colors$buttonPrimaryText',
        border: '$borders$buttonPrimary',

        '&:hover:not([disabled])': {
          background: '$colors$buttonPrimaryHoverBackground',
          color: '$colors$buttonPrimaryHoverText',
        },
        '&:active:not([disabled])': {
          background: '$colors$buttonPrimaryActiveBackground',
          color: '$colors$buttonPrimaryActiveText',
        },
      },
      secondary: {
        backgroundColor: '$colors$buttonSecondaryBackground',
        color: '$colors$buttonSecondaryText',
        border: '$borders$buttonSecondary',

        '&:hover': {
          backgroundColor: '$colors$buttonSecondaryHoverBackground',
          color: '$colors$buttonSecondaryHoverText',
        },
        '&:active': {
          backgroundColor: '$colors$buttonSecondaryActiveBackground',
          color: '$colors$buttonSecondaryActiveText',
        },
      },
      tertiary: {
        background: '$colors$buttonTertiaryBackground',
        color: '$colors$buttonTertiaryText',
        border: '$borders$buttonTertiary',

        '&:hover': {
          background: '$colors$buttonTertiaryHoverBackground',
          color: '$colors$buttonTertiaryHoverText',
        },
        '&:active': {
          background: '$colors$buttonTertiaryActiveBackground',
          color: '$colors$buttonTertiaryActiveText',
        },
      },
    },
    disabled: {
      true: {
        background: '$colors$buttonDisabledBackground !important',
        color: '$colors$buttonDisabledText !important',
      },
    },
  },
});

export const icon = css({
  position: 'relative',
  cursor: 'pointer',
});
