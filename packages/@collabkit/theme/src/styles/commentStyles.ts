import { css } from '@stitches/react';

export const container = css({
  display: 'flex',
  flex: 1,
  gap: '$space$2',
  position: 'relative',
  maxWidth: 'calc(100% - $padding$1)',
  padding: '4px $padding$2',
  lineHeight: '$lineHeights$1',

  variants: {
    isPreview: {
      true: {
        overflow: 'hidden',
      },
    },
    type: {
      inline: {
        paddingTop: 0,
        paddingBottom: 0,
      },
      'inline-start': {
        paddingBottom: 0,
      },
      'inline-end': {
        paddingTop: 0,
      },
      default: {},
    },
  },
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
    // indents the comment
    // to account for a profile
    // image
    profileIndent: {
      true: {
        marginLeft: '$padding$4',
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
