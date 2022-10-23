import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../Theme.css';

export const modal = style({
  background: '#4A3A63',
  borderRadius: '24px',
  width: '100%',
  maxWidth: '1124px',
  padding: '108px 0 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const controls = style({
  display: 'flex',
  gap: '60px',
  padding: '40px 0',
  justifyContent: 'center',
  background: 'rgba(0, 0, 0, 0.25)',
  borderRadius: '0px 0px 24px 24px',
  flex: 1,
  width: '100%',
});

// toggle buttons

export const toggleButtonGroup = style({});

export const toggleButton = recipe({
  base: {
    background: 'rgba(0, 0, 0, 0.3)',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Satoshi',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 16,
    cursor: 'pointer',
    lineHeight: 18,
  },
  variants: {
    active: {
      true: {
        cursor: 'default',
        outline: '6px solid rgba(255, 255, 255, 0.15)',
      },
    },
  },
});

export const toggleButtonGroupTitle = style({
  fontFamily: 'Satoshi',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 16,
  marginBottom: '20px',
  alignSelf: 'flex-start',
  textAlign: 'left',
  lineHeight: '110%',
  color: vars.color.textContrastHigh,
});

export const toggleButtonGroupOptions = style({
  gap: '16px',
  display: 'flex',
  flexDirection: 'row',
});
