import { style } from '@vanilla-extract/css';

export const root = style({
  boxSizing: 'border-box',
  height: '100%',
  background: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  position: 'fixed',
  top: 0,
  width: 433,
  right: 0,
  bottom: 0,
});

export const title = style({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 18,
  lineHeight: '153%',
  letterSpacing: -0.25,
  margin: 0,
  display: 'flex',
  alignItems: 'space-between',
  padding: '22px 24px',
  borderBottom: '1px solid #E3E9ED',
});
