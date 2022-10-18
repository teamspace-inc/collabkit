import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './Theme.css';

export const appName = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 24,
  lineHeight: '28px',
});

export const appKey = style({});

export const dashboardApp = style({
  border: `1px solid ${vars.color.bgContrastMedium}`,
  borderRadius: '6px',
  padding: '24px',
});

export const dashboardAppItem = style({
  display: 'grid',
  gridTemplateColumns: '180px 1fr 1fr',
  padding: '20px 0px',
  borderTop: `1px solid ${vars.color.bgContrastMedium}`,
});

globalStyle(`${dashboardAppItem} input[type=password]`, {
  background: 'transparent',
  color: vars.color.textContrastLow,
  fontSize: 24,
  lineHeight: '32px',
  letterSpacing: '1px',
  border: 'none',
  outline: 'none',
});

export const dashboardAppItemKey = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '32px',
  color: vars.color.textContrastMedium,
});

export const dashboardAppItemSecureMode = style({});
