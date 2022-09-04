import { css } from '@stitches/react';

export const root = css({
  display: 'flex',
  flex: 1,
  gap: '$space$2',
  position: 'relative',
  maxWidth: 'calc(100% - $padding$1)',
  padding: '$padding$commentTop $padding$commentRight $padding$commentBottom $padding$commentLeft',
  lineHeight: '$lineHeights$1',

  '&:hover': {
    backgroundColor: '$colors$commentHoverBackgroundColor',
  },

  variants: {
    isPreview: {
      true: {
        overflow: 'hidden',
      },
    },
    type: {
      inline: {
        paddingTop: 'calc($padding$commentTop/2)',
        paddingBottom: 'calc($padding$commentBottom/2)',
      },
      'inline-start': {
        paddingTop: 'calc($padding$commentTop/2)',
        paddingBottom: 'calc($padding$commentTop/2)',
      },
      'inline-end': {
        paddingTop: 'calc($padding$commentTop/2)',
        paddingBottom: 'calc($padding$commentBottom/2)',
      },
      default: {},
    },
    seen: {
      false: {
        // background: '$colors$commentUnseenBackgroundColor',
        // '&:hover': {
        //   backgroundColor: '$colors$commentUnseenHoverBackgroundColor',
        // },
      },
      true: {},
    },
  },

  p: {
    margin: 0,
  },

  a: {
    fontWeight: '700',
    color: '$colors$primaryText',
    textDecoration: 'none',
  },
});

export const messageTextOffset = css({
  marginLeft: 'calc($padding$commentLeft + $sizes$avatar + $space$2)',
});

export const message = css({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  flex: 0,
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  color: '$colors$primaryText',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  gap: '4px',
  borderRadius: '$radii$1',

  variants: {
    // indents the comment to account
    // for a profile image
    profileIndent: {
      true: {
        marginLeft: 'calc($sizes$avatar + $padding$1)',
      },
      false: {},
    },
  },
});

export const body = css({
  variants: {
    isPreview: {
      true: {
        position: 'relative',
        maxHeight: 54,
        display: 'inline-flex',
      },
    },
  },
});

export const bodyEllipsis = css({
  position: 'absolute',
  right: '0ch',
  bottom: 0,
  background: '$colors$neutral1',
});
