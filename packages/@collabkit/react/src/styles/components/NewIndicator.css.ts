import { fallbackVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme/index.css';
import { paddingLeft, paddingRight } from './Comment.css';

const lineHeight = fallbackVar(vars.newIndicator.lineHeight, '16px');

export const root = style({
  minWidth: 40,
  height: lineHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  fontFamily: vars.fontFamily,
  margin: fallbackVar(vars.newIndicator.margin, `0 0 ${vars.space[2]}`),
});

export const line = style({
  background: fallbackVar(vars.newIndicator.line.background, vars.color.attention),
  height: '1px',
  position: 'absolute',
  left: paddingLeft,
  right: paddingRight,
  bottom: '50%',
});

export const textInlay = style({
  background: fallbackVar(vars.newIndicator.inlay.background, vars.color.attention),
  display: 'inline-block',
  color: fallbackVar(vars.newIndicator.color, 'white'),
  fontSize: fallbackVar(vars.newIndicator.fontSize, vars.text.tiny.fontSize),
  fontWeight: fallbackVar(vars.newIndicator.fontWeight, vars.fontWeight.bold),
  lineHeight: lineHeight,
  letterSpacing: fallbackVar(vars.newIndicator.letterSpacing, vars.text.tiny.letterSpacing),
  padding: fallbackVar(vars.newIndicator.padding, `0px ${vars.space[2]}`),
  position: 'relative',
  borderRadius: calc.divide(lineHeight, 2),
  fontFamily: vars.fontFamily,
});
