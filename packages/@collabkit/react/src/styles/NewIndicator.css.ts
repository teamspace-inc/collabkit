import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from './themes.css';

export const root = style({
  minWidth: 40,
  height: vars.inbox.newIndicator.lineHeight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

export const line = style({
  background: vars.inbox.newIndicator.line.background,
  height: '1px',
  position: 'absolute',
  left: vars.comment.paddingLeft,
  right: vars.comment.paddingRight,
  bottom: '50%',
});

export const textInlay = style({
  background: vars.inbox.newIndicator.inlay.background,
  display: 'inline-block',
  color: vars.inbox.newIndicator.color,
  fontSize: vars.inbox.newIndicator.fontSize,
  fontWeight: vars.inbox.newIndicator.fontWeight,
  lineHeight: vars.inbox.newIndicator.lineHeight,
  letterSpacing: vars.inbox.newIndicator.letterSpacing,
  padding: '0px 8px',
  position: 'relative',
  borderRadius: calc.divide(vars.inbox.newIndicator.lineHeight, 2),
});
