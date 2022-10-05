import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from './theme';

const ltr = style({
  textAlign: 'left',
});
const rtl = style({
  textAlign: 'right',
});

export const placeholder = style({
  color: vars.composer.placeholder.color,
  fontSize: vars.composer.fontSize,
  fontWeight: vars.composer.fontWeight,
  letterSpacing: vars.composer.letterSpacing,
  lineHeight: vars.composer.lineHeight,
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '50%',
  transform: 'translateY(-50%)',
  left: vars.space[2],
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
});

const paragraph = style({
  margin: 0,
  position: 'relative',
});

export const lexicalTheme = {
  ltr,
  rtl,
  placeholder,
  paragraph,
};

export const contentEditable = recipe({
  base: {
    resize: 'none',
    caretColor: vars.composer.caretColor,
    color: vars.composer.color,
    fontSize: vars.composer.fontSize,
    lineHeight: vars.composer.lineHeight,
    letterSpacing: vars.composer.letterSpacing,
    fontWeight: vars.composer.fontWeight,
    padding: vars.composer.padding,
    position: 'relative',
    tabSize: 1,
    boxSizing: 'border-box',
    outline: 0,
    width: '100%',
  },
  variants: {
    disabled: {
      true: {
        color: vars.composer.disabled.color,
        background: vars.composer.disabled.background,
      },
    },
  },
});

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: `0 ${vars.space[4]}`,
});

export const editor = recipe({
  base: {
    background: vars.composer.background,
    border: vars.composer.border,
    borderRadius: vars.composer.borderRadius,
    flex: '1',
    width: '100%',
    position: 'relative',
    verticalAlign: 'top',
    boxSizing: 'border-box',
  },
  variants: {
    active: {
      true: {
        background: vars.composer.active.background,
        border: vars.composer.active.border,
      },
    },
    hover: {
      true: {
        background: vars.composer.hover.background,
        border: vars.composer.hover.border,
      },
    },
    disabled: {
      true: {
        background: vars.composer.disabled.background,
        border: vars.composer.disabled.border,
      },
    },
  },
});
