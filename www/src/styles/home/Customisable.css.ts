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

export const sliderLabel = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: '110%',
});

// toggle buttons

export const toggleButtonGroup = style({});

export const toggleButton = recipe({
  base: {
    background: 'rgba(0, 0, 0, 0.3)',
    minWidth: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 16,
    cursor: 'pointer',
    lineHeight: 18,
  },
  variants: {
    active: {
      true: {
        fontWeight: 500,
        cursor: 'default',
        outline: '6px solid rgba(255, 255, 255, 0.15)',
      },
    },
  },
});

export const toggleButtonGroupTitle = style({
  fontFamily: 'Inter',
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

// theme slider

export const slider = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '292px',
  marginTop: 21,
  marginBottom: 21,
});

export const track = style({
  backgroundColor: 'rgba(0,0,0,0.3)',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',
  height: 8,
});

export const range = style({
  position: 'absolute',
  backgroundColor: 'white',
  borderRadius: '9999px',
  height: '100%',
});

export const thumb = style({
  all: 'unset',
  display: 'block',
  width: 50,
  height: 50,
  backgroundColor: 'white',
  borderRadius: 50,
  ':hover': { backgroundColor: 'white' },
  ':focus': { boxShadow: `0 0 0 5px ${'rgba(0,0,0,0.3)'}` },
});
