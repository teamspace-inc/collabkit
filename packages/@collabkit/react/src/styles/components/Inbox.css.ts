import { style } from '@vanilla-extract/css';
import { vars } from '../theme';
export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  boxSizing: 'border-box',
  height: '100%',
  borderRadius: 0,
  background: vars.color.background,
});

export const emptyState = {
  root: style({
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    gap: '11px',
  }),
  title: style({
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 24,
    lineHeight: '135%',
    textAlign: 'center',
    letterSpacing: -0.1,
    color: '#6A7278',
  }),
  body: style({
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '160%',
    textAlign: 'center',
    letterSpacing: -0.1,
    color: '#6A7278',
  }),
};
