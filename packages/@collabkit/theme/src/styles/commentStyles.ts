import { css } from '@stitches/react';

export const markdown = css({
  p: {
    margin: 0,
  },

  a: {
    fontWeight: '700',
    color: '$colors$primaryText',
    textDecoration: 'none',
  },
});

export const root = css(
  {
    display: 'flex',
    flex: 1,
    gap: '$space$2',
    position: 'relative',
    maxWidth: 'calc(100% - $padding$1)',
    padding:
      '$padding$commentTop $padding$commentRight $padding$commentBottom $padding$commentLeft',
    lineHeight: '$lineHeights$1',

    '&:hover': {
      backgroundColor: '$colors$commentHoverBackgroundColor',
    },

    variants: {
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
  },
  markdown
);

export const messageTextOffset = css({
  marginLeft: 'calc($padding$commentLeft + $sizes$avatar + $space$2)',
});

export const message = css({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  flex: 1,

  gap: '8px',
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
  position: 'relative',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  color: '$colors$primaryText',
});

export const bodyEllipsis = css({
  position: 'absolute',
  right: '0ch',
  bottom: 0,
  background: '$colors$neutral1',
});

export const editor = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  background: '$colors$neutral2',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  color: 'white',
});
