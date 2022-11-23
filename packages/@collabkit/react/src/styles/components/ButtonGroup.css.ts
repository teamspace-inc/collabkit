import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  gap: fallbackVar(vars.buttonGroup.gap, vars.space[1]),
  justifyContent: 'flex-end',
  fontFamily: vars.fontFamily,
});
