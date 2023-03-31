import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const root = recipe({
  base: {
    // height: 140,
    // width: 188,
    background: vars.color.surface,
    borderRadius: '6px',
    zIndex: 999,
    border: '1px solid ' + vars.color.surfaceOverlay,
  },
  variants: {
    type: {
      quick: {
        height: 40,
        padding: vars.space[2],
      },
    },
  },
});

const size = '24px';

export const emojiGrid = style({
  display: 'grid',
  gridTemplateColumns: `repeat(6, ${size})`,
});

export const category = style({
  padding: `${vars.space[0]} ${vars.space[2]} ${vars.space[2]} ${vars.space[2]}`,
  selectors: {
    '&:first-of-type': {
      paddingTop: vars.space[2],
    },
    '&:last-of-type': {
      paddingBottom: vars.space[2],
    },
  },
});

export const emoji = style({
  width: size,
  height: size,
  fontSize: vars.text.large.lineHeight,
  fontFamily: 'sans-serif', // Needs to be a system font with emoji support
  lineHeight: vars.text.large.lineHeight,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:hover': {
      background: vars.color.attentionBlue,
      borderRadius: '6px',
    },
  },
});

export const categoryTitle = style({
  padding: `0 0 ${vars.space[1]}`,
  color: vars.color.textDisabled,
  fontSize: vars.text.small.fontSize,
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.text.small.letterSpacing,
  lineHeight: vars.text.small.lineHeight,
  fontFamily: vars.fontFamily,
});
