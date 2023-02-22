import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  background: fallbackVar(vars.inbox.background, vars.color.background),
  borderRadius: '12px',
});

export const popover = style({
  background: 'white',
  borderRadius: '12px',
  width: 240,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.high,
  zIndex: 999,
});
