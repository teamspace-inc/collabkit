import { css } from '@stitches/react';

export const baseTextStyles = css({
  fontSize: '$fontSizes$3',
  lineHeight: '$lineHeights$3',
  color: '$colors$text',
  fontKerning: 'none',
  position: 'relative',

  variants: {
    isEditing: {
      true: {
        cursor: 'text',
      },
    },
  },
});

export const editorLinkStyles = css({
  '& a[data-card-id]': {
    fontWeight: 600,
    color: '$colors$text',
    cursor: 'pointer',
  },
});

export const editorPlaceholder = css({
  '&:before': {
    content: 'Text',
    position: 'absolute',
    color: '$colors$placeholderText',
  },
});

export const editorPStyles = css({
  '& p': {
    display: 'block',
    margin: '6px 0',
    fontSize: '$fontSizes$p',
    lineHeight: '$lineHeights$p',

    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },

  [`& p.${editorPlaceholder}:before`]: {
    content: 'Aa',
  },

  '& > div > p:last-child': {
    marginBottom: '0px',
  },
});

export const editorHeadingStyles = css({
  '& h1': {
    marginTop: '6px',
    marginBottom: '6px',
    fontSize: '$fontSizes$h1',
    lineHeight: '$lineHeights$h1',
    fontWeight: 600,

    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },

  [`& h1.${editorPlaceholder}:before`]: {
    content: 'Untitled',
  },

  '& h2': {
    marginTop: '6px',
    marginBottom: '6px',
    fontSize: '$fontSizes$h2',
    lineHeight: '$lineHeights$h2',
    fontWeight: 600,

    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },

  '& h3': {
    marginTop: '6px',
    marginBottom: '6px',
    fontSize: '$fontSizes$h3',
    lineHeight: '$lineHeights$h3',
    fontWeight: 500,

    '&:first-child': {
      marginTop: 0,
    },

    '&:last-child': {
      marginBottom: 0,
    },
  },
});

export const editorListStyles = css({
  '& ol, & ul': {
    marginBlockStart: '11px',
    marginBlockEnd: '11px',
    paddingInlineStart: '$size$4',

    'ol, ul': {
      marginBlockStart: '0px',
      marginBlockEnd: '0px',
    },

    '&:first-child': {
      marginBlockStart: 0,
    },

    '&:last-child': {
      marginBlockEnd: 0,
    },
  },

  '& ol p': {
    margin: 0,
  },

  '& ul p': {
    margin: 0,
  },

  '& ol:first-child, & ul:first-child': {
    marginBlockStart: '0px',
  },

  '& ol:last-child, & ul:last-child': {
    marginBlockEnd: '0px',
  },

  '& ol:last-child:first-child, & ul:last-child:first-child': {
    marginBlockEnd: '0px',
    marginBlockStart: '0px',
  },
});
