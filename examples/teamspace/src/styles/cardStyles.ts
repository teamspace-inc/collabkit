import { css } from '@stitches/react';

export const cardShadowStyles = css({
  boxShadow: '$shadows$1',
  variants: {
    isDragging: {
      true: {
        boxShadow: '$shadows$2',
      },
    },
  },
});

export const basicCardCss = css(
  {
    resize: 'none',
    display: 'flex',
    backgroundColor: '$colors$cardBackground',
    padding: '0px',
    border: 'none',
    lineBreak: 'after-white-space',
    caretColor: '$colors$text',
    overflowWrap: 'break-word',
    fontKerning: 'none',
    userSelect: 'none',

    variants: {
      isEditing: {
        true: {
          userSelect: 'unset',
          cursor: 'text',
        },
      },
      isRounded: {
        true: {
          borderRadius: '$radii$2',
        },
      },
    },
  },
  cardShadowStyles
);

export const cardInner = css({
  '.ProseMirror': {
    padding: '$space$3',
  },
});

export const cardCss = css(
  {
    maxWidth: 22 * 7 * 3.5,
    resize: 'none',
    display: 'flex',
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    wordWrap: 'break-word',
    backgroundColor: '$colors$cardBackground',
    padding: '0px',
    border: 'none',
    lineBreak: 'after-white-space',
    caretColor: '$colors$text',
    overflowWrap: 'break-word',
    fontKerning: 'none',
    userSelect: 'none',

    variants: {
      isEditing: {
        true: {
          userSelect: 'unset',
          cursor: 'text',
        },
      },
      isRounded: {
        true: {
          borderRadius: '$radii$2',
        },
      },
      fullHeight: {
        true: {
          height: '100%',
        },
      },
    },
  },
  cardShadowStyles
);
