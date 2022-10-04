import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from './themes.css';

export const root = style({
  minWidth: 40,
  height: vars.newIndicator.lineHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const line = style({
  background: vars.newIndicator.line.background,
  height: '1px',
  position: 'absolute',
  left: vars.comment.paddingLeft,
  right: vars.comment.paddingRight,
  bottom: '50%',
});

export const textInlay = style({
  background: vars.newIndicator.inlay.background,
  display: 'inline-block',
  color: vars.newIndicator.color,
  fontSize: vars.newIndicator.fontSize,
  fontWeight: vars.newIndicator.fontWeight,
  lineHeight: vars.newIndicator.lineHeight,
  letterSpacing: vars.newIndicator.letterSpacing,
  padding: '0px 8px',
  position: 'relative',
  borderRadius: calc.divide(vars.newIndicator.lineHeight, 2),
});
