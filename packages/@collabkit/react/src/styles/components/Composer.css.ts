import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme';

const ltr = style({
  textAlign: 'left',
});

const rtl = style({
  textAlign: 'right',
});

export const placeholder = style({
  color: fallbackVar(vars.composer.placeholder.color, vars.color.textSecondary),
  fontSize: fallbackVar(vars.composer.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.composer.fontWeight, vars.fontWeights.regular),
  letterSpacing: fallbackVar(vars.composer.letterSpacing, vars.text.base.letterSpacing),
  lineHeight: fallbackVar(vars.composer.lineHeight, vars.text.base.lineHeight),
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

export const composerGlobalStyles = style({});

globalStyle(`${composerGlobalStyles} p`, {
  margin: '0 !important',
  padding: '0 !important',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)} !important`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeights.regular)} !important`,
  color: `${fallbackVar(vars.comment.body.color, vars.color.textPrimary)} !important`,
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)} !important`,
  letterSpacing: `${fallbackVar(
    vars.comment.body.letterSpacing,
    vars.text.base.letterSpacing
  )} !important`,
});

export const contentEditable = recipe({
  base: {
    resize: 'none',
    caretColor: fallbackVar(vars.composer.caretColor, vars.color.textPrimary),
    color: fallbackVar(vars.composer.color, vars.color.textPrimary),
    fontSize: fallbackVar(vars.composer.fontSize, vars.text.base.fontSize),
    lineHeight: fallbackVar(vars.composer.lineHeight, vars.text.base.lineHeight),
    letterSpacing: fallbackVar(vars.composer.letterSpacing, vars.text.base.letterSpacing),
    fontWeight: fallbackVar(vars.composer.fontWeight, vars.fontWeights.regular),
    padding: fallbackVar(vars.composer.padding, vars.space[2]),
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
    background: fallbackVar(vars.composer.background, vars.color.surface),
    border: fallbackVar(vars.composer.border, `none`),
    borderRadius: fallbackVar(vars.composer.borderRadius, '6px'),
    flex: '1',
    width: '100%',
    position: 'relative',
    verticalAlign: 'top',
    boxSizing: 'border-box',
  },
  variants: {
    active: {
      true: {
        background: fallbackVar(vars.composer.active.background, vars.color.surface),
        border: fallbackVar(vars.composer.active.border, 'none'),
      },
    },
    hover: {
      true: {
        background: fallbackVar(vars.composer.hover.background, vars.color.surface),
        border: fallbackVar(vars.composer.hover.border, 'none'),
      },
    },
    disabled: {
      true: {
        background: fallbackVar(vars.composer.disabled.background, vars.color.surface),
        border: fallbackVar(vars.composer.disabled.border, 'none'),
      },
    },
  },
});
