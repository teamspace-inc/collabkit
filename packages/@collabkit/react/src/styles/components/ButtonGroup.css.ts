import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  gap: fallbackVar(vars.buttonGroup.gap, vars.space[1]),
  padding: fallbackVar(vars.buttonGroup.padding, `0px ${vars.space[4]} ${vars.space[4]}`),
  justifyContent: 'flex-end',
  fontFamily: vars.fontFamily,
});
