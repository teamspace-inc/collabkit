import { css } from '@stitches/react';

export const message = css({
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

export const container = css({
  display: 'flex',
  flex: 1,
  gap: '$space$2',
  position: 'relative',
  maxWidth: 'calc(100% - $padding$1)',
  padding: '4px $padding$2',
});
