import { style } from '@vanilla-extract/css';
import { vars } from '../theme';

export const popover = style({
  width: 292,
  height: 'auto',
  display: 'flex',
  minHeight: '52px',
  background: vars.color.background,
  borderRadius: 12,
  boxShadow: vars.shadow.standard,
  padding: '12px',
});

export const composer = style({
  display: 'flex',
  flex: 1,
  gap: '12px',
});
