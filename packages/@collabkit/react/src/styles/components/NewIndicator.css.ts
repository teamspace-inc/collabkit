import { fallbackVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';

export const root = style({
  minWidth: 40,
  height: fallbackVar(vars.newIndicator.lineHeight, '16px'),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const line = style({
  background: fallbackVar(vars.newIndicator.line.background, vars.color.border),
  height: '1px',
  position: 'absolute',
  left: vars.comment.paddingLeft,
  right: vars.comment.paddingRight,
  bottom: '50%',
});

export const textInlay = style({
  background: fallbackVar(vars.newIndicator.inlay.background, vars.color.attention),
  display: 'inline-block',
  color: fallbackVar(vars.newIndicator.color, 'white'),
  fontSize: fallbackVar(vars.newIndicator.fontSize, vars.text.tiny.fontSize),
  fontWeight: fallbackVar(vars.newIndicator.fontWeight, vars.fontWeight.bold),
  lineHeight: fallbackVar(vars.newIndicator.lineHeight, '16px'),
  letterSpacing: fallbackVar(vars.newIndicator.letterSpacing, vars.text.tiny.letterSpacing),
  padding: fallbackVar(vars.newIndicator.padding, '0px 8px'),
  position: 'relative',
  borderRadius: calc.divide(vars.newIndicator.lineHeight, 2),
});
