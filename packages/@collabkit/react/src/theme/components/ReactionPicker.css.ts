import { style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  height: 200,
  width: 240,
  background: vars.color.surface,
  borderRadius: '6px',
});

export const emojiGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
});

export const category = style({
  padding: vars.space[2],
});

const size = '24px';

export const emoji = style({
  width: size,
  height: size,
  padding: vars.space[1],
  fontSize: size,
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
  padding: `0 0 ${vars.space[2]}`,
  color: vars.color.textDisabled,
  fontSize: vars.text.base.fontSize,
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.text.base.letterSpacing,
  lineHeight: vars.text.base.lineHeight,
  fontFamily: vars.fontFamily,
});
