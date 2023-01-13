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

const typingHeight = fallbackVar(vars.composer.typingIndicator.lineHeight, vars.space[3]);

export const typing = style({
  height: typingHeight,
  marginLeft: calc.add(vars.avatar.size, fallbackVar(vars.comment.gap, vars.space[2])),
  marginTop: calc.negate(fallbackVar(vars.composer.gap, vars.space[2])),
  paddingTop: `${calc(vars.space[1]).divide(2)}`,
  paddingBottom: `${calc(vars.space[1]).divide(2)}`,
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

export const pinButton = style({
  position: 'absolute',
  top: 8,
  left: 8,
});

export const placeholder = recipe({
  base: {
    color: fallbackVar(vars.composer.input.placeholder.color, vars.color.textSecondary),
    fontSize: fallbackVar(vars.composer.input.fontSize, vars.text.base.fontSize),
    fontWeight: fallbackVar(vars.composer.input.fontWeight, vars.fontWeight.regular),
    letterSpacing: fallbackVar(vars.composer.input.letterSpacing, vars.text.base.letterSpacing),
    lineHeight: fallbackVar(vars.composer.input.lineHeight, vars.text.base.lineHeight),
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    top: '17px',
    transform: 'translateY(-50%)',
    left: vars.space[2],
    userSelect: 'none',
    display: 'inline-block',
    pointerEvents: 'none',
    fontFamily: vars.fontFamily,
  },
  variants: {
    canPin: {
      true: {
        left: `${calc(vars.space[2]).add('24px')}`,
      },
    },
  },
});

const paragraph = style({
  margin: 0,
  position: 'relative',
  fontFamily: vars.fontFamily,
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
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)} !important`,
  color: `${fallbackVar(vars.comment.body.color, vars.color.textPrimary)} !important`,
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)} !important`,
  letterSpacing: `${fallbackVar(
    vars.comment.body.letterSpacing,
    vars.text.base.letterSpacing
  )} !important`,
  fontFamily: `${vars.fontFamily} !important`,
});

globalStyle('.collabkit-composer-pin', {
  display: 'inline',
  margin: '-4px 0px 0px',
});

export const input = recipe({
  base: {
    resize: 'none',
    caretColor: fallbackVar(vars.composer.input.caretColor, vars.color.textPrimary),
    color: fallbackVar(vars.composer.input.color, vars.color.textPrimary),
    fontSize: fallbackVar(vars.composer.input.fontSize, vars.text.base.fontSize),
    lineHeight: fallbackVar(vars.composer.input.lineHeight, vars.text.base.lineHeight),
    letterSpacing: fallbackVar(vars.composer.input.letterSpacing, vars.text.base.letterSpacing),
    fontWeight: fallbackVar(vars.composer.input.fontWeight, vars.fontWeight.regular),
    padding: fallbackVar(vars.composer.input.padding, vars.space[2]),
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
    canPin: {
      true: {
        left: '24px',
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
  padding: fallbackVar(vars.composer.padding, `0 ${vars.space[4]} 0px`),
  border: fallbackVar(vars.composer.border, `none`),
  gap: fallbackVar(vars.composer.gap, vars.space[2]),
});

export const editor = recipe({
  base: {
    background: fallbackVar(vars.composer.input.background, vars.color.surface),
    border: fallbackVar(vars.composer.input.border, 'none'),
    borderRadius: fallbackVar(vars.composer.input.borderRadius, '6px'),
    flex: '1',
    width: '100%',
    position: 'relative',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    fontFamily: vars.fontFamily,
    display: 'flex',
    flexDirection: 'column',
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

export const buttonGroup = style({
  display: 'flex',
  padding: '0px 6px 6px',
  gap: '0px',
});

globalStyle('.collabkit-pin-node', {
  width: '16px',
  height: '16px',
  margin: '-4px 0px 0px',
});

globalStyle('.collabkit-composer-pin', {
  width: '16px',
  height: '16px',
  margin: '-4px 0px 0px',
});
