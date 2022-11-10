import { style } from '@vanilla-extract/css';

export const slide = style({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  boxSizing: 'border-box',
});

export const card = style({
  fontFamily: 'Inter, sans-serif !important',
  background: '#2E2739',
  color: 'white',
  width: 360,
  height: 272,
  padding: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  borderRadius: '24px',
  overflow: 'hidden',
  gap: 24,

  '@media': {
    'screen and (max-width: 720px)': {},
  },
});

export const profile = style({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  alignItems: 'center',
});

export const profilePicture = style({
  width: 48,
  height: 48,
  borderRadius: '50%',
});

export const name = style({
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '19px',
  fontFeatureSettings: "'ss04' on",
  marginBottom: 4,
});

export const title = style({
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '19px',
  fontFeatureSettings: "'ss04' on",
  color: '#ADA0C0',
});

export const text = style({
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '26px',
  height: '144px',
});
