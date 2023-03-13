import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

const ltr = style({
  textAlign: 'left',
});

const rtl = style({
  textAlign: 'right',
});

const typingHeight = fallbackVar(vars.composer.typingIndicator.lineHeight, vars.space[4]);

export const typing = style({
  height: typingHeight,
  marginLeft: calc.add(vars.avatar.size, fallbackVar(vars.comment.gap, vars.space[5])),
  marginTop: calc.negate(fallbackVar(vars.composer.gap, vars.space[3])),
  paddingTop: `0px`,
  paddingBottom: `${calc(vars.space[1])}`,
  overflow: 'hidden',
  flexBasis: '100%',
  color: fallbackVar(vars.composer.typingIndicator.color, vars.color.textSecondary),
  fontSize: fallbackVar(vars.composer.typingIndicator.fontSize, vars.text.tiny.fontSize),
  lineHeight: typingHeight,
  letterSpacing: fallbackVar(
    vars.composer.typingIndicator.letterSpacing,
    vars.text.small.letterSpacing
  ),
  fontFamily: vars.fontFamily,
});

export const composerLeftPadding = style({
  width: vars.space[2],
});

export const placeholder = style({
  color: fallbackVar(vars.composer.input.placeholder.color, vars.color.textSecondary),
  fontSize: fallbackVar(vars.composer.input.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.composer.input.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.composer.input.letterSpacing, vars.text.base.letterSpacing),
  lineHeight: fallbackVar(vars.composer.input.lineHeight, vars.text.base.lineHeight),
  overflow: 'hidden',
  position: 'absolute',
  wordWrap: 'break-word',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  top: '17px',
  transform: 'translateY(-50%)',
  left: vars.space[2],
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
  fontFamily: vars.fontFamily,
});

const paragraph = style({
  margin: `0 !important`,
  fontSize: `${fallbackVar(vars.composer.input.fontSize, vars.text.base.fontSize)} !important`,
  lineHeight: `${fallbackVar(
    vars.composer.input.lineHeight,
    vars.text.base.lineHeight
  )} !important`,
  color: `${fallbackVar(vars.composer.input.color, vars.color.textPrimary)} !important`,
  position: 'relative',
  fontFamily: vars.fontFamily,
});

const span = style({
  margin: `0 !important`,
  fontSize: `${fallbackVar(vars.composer.input.fontSize, vars.text.base.fontSize)} !important`,
  lineHeight: `${fallbackVar(
    vars.composer.input.lineHeight,
    vars.text.base.lineHeight
  )} !important`,
  position: 'relative',
  color: `${fallbackVar(vars.composer.input.color, vars.color.textPrimary)} !important`,
  fontFamily: vars.fontFamily,
});

export const lexicalTheme = {
  ltr,
  rtl,
  placeholder,
  paragraph,
  span,
};

export const composerGlobalStyles = style({});

globalStyle(`${composerGlobalStyles} p`, {
  margin: '0 !important',
  padding: '0 !important',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)} !important`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)} !important`,
  color: `${fallbackVar(vars.comment.body.color, vars.color.textPrimary)} !important`,
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)} !important`,
  letterSpacing: `${fallbackVar(
    vars.comment.body.letterSpacing,
    vars.text.base.letterSpacing
  )} !important`,
  fontFamily: `${vars.fontFamily} !important`,
});

export const contentEditable = recipe({
  base: {
    resize: 'none',
    caretColor: fallbackVar(vars.composer.input.caretColor, vars.color.textPrimary),
    color: fallbackVar(vars.composer.input.color, vars.color.textPrimary),
    fontSize: fallbackVar(vars.composer.input.fontSize, vars.text.base.fontSize),
    lineHeight: fallbackVar(vars.composer.input.lineHeight, vars.text.base.lineHeight),
    letterSpacing: fallbackVar(vars.composer.input.letterSpacing, vars.text.base.letterSpacing),
    fontWeight: fallbackVar(vars.composer.input.fontWeight, vars.fontWeight.regular),
    padding: fallbackVar(vars.composer.input.padding, `${vars.space[2]}`),
    position: 'relative',
    tabSize: 1,
    boxSizing: 'border-box',
    outline: 0,
    width: '100%',
    textAlign: 'left',
    fontFamily: vars.fontFamily,
  },
  variants: {
    disabled: {
      true: {
        color: vars.composer.input.disabled.color,
        background: vars.composer.input.disabled.background,
      },
    },
  },
});

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  fontFamily: vars.fontFamily,
  padding: fallbackVar(vars.composer.padding, `${vars.space[2]} ${vars.space[4]} 0px`),
  border: fallbackVar(vars.composer.border, `none`),
  gap: fallbackVar(vars.composer.gap, vars.space[3]),
});

export const editor = recipe({
  base: {
    background: fallbackVar(vars.composer.input.background, vars.color.surface),
    border: fallbackVar(vars.composer.input.border, 'none'),
    borderRadius: fallbackVar(vars.composer.input.borderRadius, '6px'),
    flex: 1,
    verticalAlign: 'top',
    boxSizing: 'border-box',
    fontFamily: vars.fontFamily,
  },
  variants: {
    active: {
      true: {
        background: fallbackVar(vars.composer.input.active.background, vars.color.surface),
        border: fallbackVar(vars.composer.input.active.border, 'none'),
      },
    },
    hover: {
      true: {
        background: fallbackVar(vars.composer.input.hover.background, vars.color.surface),
        border: fallbackVar(vars.composer.input.hover.border, 'none'),
      },
    },
    disabled: {
      true: {
        background: fallbackVar(vars.composer.input.disabled.background, vars.color.surface),
        border: fallbackVar(vars.composer.input.disabled.border, 'none'),
      },
    },
  },
});

export const button = recipe({
  base: {
    border: 'none',
    background: 'none',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${vars.space[1]} ${vars.space[2]}`,
    borderRadius: '4px',
    selectors: {
      '&:hover': {
        background: vars.color.surfaceOverlay,
      },
    },
  },
  variants: {
    type: {
      primary: {
        color: vars.color.textPrimary,
        fontSize: vars.text.base.fontSize,
        lineHeight: vars.text.base.lineHeight,
        letterSpacing: vars.text.base.letterSpacing,
        fontWeight: vars.fontWeight.bold,
      },
      secondary: {
        color: vars.color.textSecondary,
        fontSize: vars.text.base.fontSize,
        lineHeight: vars.text.base.lineHeight,
        letterSpacing: vars.text.base.letterSpacing,
        fontWeight: vars.fontWeight.regular,
      },
    },
  },
});

export const buttonGroup = style({
  display: 'flex',
  marginTop: calc.negate(vars.space[1]),
  padding: `0px ${vars.space[2]} ${calc(vars.space[1]).add(calc(vars.space[1]).divide(2))} ${
    vars.space[2]
  }`,
  gap: '0px',
  marginLeft: `${calc(vars.space[1]).negate()}`,
  selectors: {
    '&:empty': { display: 'none' },
  },
});
