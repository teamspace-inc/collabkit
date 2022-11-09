import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../styles/Theme.css';

export const list = style({
  marginTop: 30,
  marginBottom: 23,
});

export const row = recipe({
  base: {
    borderTop: '1px solid #E1E7ED',
    height: 40,
    display: 'flex',
    alignItems: 'center',

    selectors: {
      '&:hover': {
        background: '#EBF5FF',
      },
    },
  },
  variants: {
    selected: {
      true: {
        background: '#EBF5FF',
      },
    },
  },
});

export const name = style({
  color: vars.color.textContrastHigh,
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '95%',
  width: 240,
  display: 'flex',
  gap: 12,
  paddingLeft: 8,
});

export const role = style({
  color: vars.color.textContrastHigh,
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '95%',
  paddingLeft: 12,
});

export const checkbox = style({});

export const modal = style({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.1)',
});

export const sidebar = style({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: 320,

  borderLeft: '1px solid #E1E7ED',

  display: 'flex',
  flexDirection: 'column',
  background: 'white',
  paddingBottom: 8,
});

export const sidebarTitle = style({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '14px',
  lineHeight: '95%',
  color: vars.color.textContrastHigh,
  marginBottom: 40,
  padding: '22px 16px 0px',

  display: 'flex',
  justifyContent: 'space-between',
});

export const closeButton = style({
  background: 'none',
  padding: 4,
  marginTop: -4,
});

export const avatar = style({
  background: vars.color.yellow,
  borderRadius: '50%',
  alignSelf: 'center',
  width: 120,
  height: 120,
  marginBottom: 20,
});

export const employeeName = style({
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '23px',
  letterSpacing: 0,
  textAlign: 'center',
  color: vars.color.textContrastHigh,

  marginBottom: 12,
});

export const employeeRole = style({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '95%',
  textAlign: 'center',
  color: vars.color.textContrastLow,

  marginBottom: 20,
});

export const detailsBox = style({
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '12px',
  lineHeight: '140%',
  color: vars.color.textContrastHigh,
  margin: '0px 16px',
  border: '1px solid #E1E7ED',
  borderRadius: 8,
  padding: 16,
  marginBottom: 8,

  display: 'flex',
  flexWrap: 'wrap',
});

export const fieldName = style({
  fontWeight: '700',
  width: '50%',
  marginBottom: 8,
  selectors: {
    '&:last-of-type': {
      marginBottom: 0,
    },
  },
});
