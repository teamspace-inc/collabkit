import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme';
import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';

const ltr = style({
  textAlign: 'left',
});

const rtl = style({
  textAlign: 'right',
});

const typingHeight = fallbackVar(
  vars.composer.typingIndicator.lineHeight,
  vars.text.small.lineHeight
);

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

export const placeholder = style({
  color: fallbackVar(vars.composer.input.placeholder.color, vars.color.textSecondary),
  fontSize: fallbackVar(vars.composer.input.fontSize, vars.text.base.fontSize),
  fontWeight: fallbackVar(vars.composer.input.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.composer.input.letterSpacing, vars.text.base.letterSpacing),
  lineHeight: fallbackVar(vars.composer.input.lineHeight, vars.text.base.lineHeight),
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '50%',
  transform: 'translateY(-50%)',
  left: vars.space[2],
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
  fontFamily: vars.fontFamily,
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
  padding: fallbackVar(vars.composer.padding, `0 ${vars.space[4]} 0px`),
  border: fallbackVar(vars.composer.border, `none`),
  gap: fallbackVar(vars.composer.gap, vars.space[2]),
});

export const transitionClassNames: CSSTransitionClassNames = {
  enter: style({
    opacity: 0,
    transform: 'translateY(100%)',
  }),
  enterActive: style({
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'all 200ms ease-out',
  }),
  exit: style({
    transform: 'translateY(0)',
    opacity: 1,
  }),
  exitActive: style({
    transform: 'translateY(100%)',
    transition: 'all 200ms ease-in',
    opacity: 0,
  }),
};

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
