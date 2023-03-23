import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  width: fallbackVar(vars.inbox.width, '320px'),
  background: fallbackVar(vars.inbox.background, vars.color.background),
});

// make this generic also used in channel popover
export const popover = style({
  background: 'white',
  borderRadius: '12px',
  width: 280,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.high,
  padding: 12,
  zIndex: 999,
});
