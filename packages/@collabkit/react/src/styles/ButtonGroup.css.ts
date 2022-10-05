import { style } from '@vanilla-extract/css';
import { vars } from './theme';

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.buttonGroup.gap,
  padding: vars.buttonGroup.padding,
  justifyContent: 'flex-end',
});
