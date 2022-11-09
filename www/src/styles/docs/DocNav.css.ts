import { style, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { docs, max768 } from '../Docs.css';
import { vars } from '../Theme.css';

export const navOl = style({
  listStyle: 'none',
  boxSizing: 'border-box',
  padding: '0px 12px 0px 12px',
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [max768]: {
      paddingRight: '12px',
      textAlign: 'left',
      width: '100%',
    },
  },
});

globalStyle(`${docs} ${navOl} ol`, {
  marginTop: 0,
  marginBottom: 8,
  marginLeft: '0',
  paddingLeft: 0,
  textIndent: '20px',
  paddingRight: 0,
  display: 'flex',
  flex: 1,
});

export const navLi = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '@media': {
    [max768]: {
      alignItems: 'stretch',
    },
  },
});

export const navListItem = recipe({
  base: {
    fontSize: '16px',
    lineHeight: '32px',
    boxSizing: 'border-box',
    padding: '4px 12px',
    userSelect: 'none',
    display: 'flex',
    flex: 1,
    color: vars.color.textContrastMedium,
    textDecoration: 'none',
    borderRadius: '4px',
  },
  variants: {
    active: {
      true: {
        background: 'rgba(255, 255, 255, 0.08)',
        color: 'white',
        fontWeight: 600,
      },
      false: {
        ':hover': {
          background: 'rgba(255, 255, 255, 0.04)',
          cursor: 'pointer',
          color: 'white',
        },
      },
    },
  },
});

export const navBurgerToggle = recipe({
  base: {
    border: 'none',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '4px',
    width: '40px',
    height: '40px',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',

    ':hover': {
      background: 'rgba(255, 255, 255, 0.04)',
      cursor: 'pointer',
    },
    '@media': {
      [max768]: {
        display: 'flex',
      },
    },
  },
  variants: {
    active: {
      true: {
        background: 'rgba(255, 255, 255, 0.08)',
        ':hover': {
          background: 'rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});

export const navWrap = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '100px',
  paddingTop: '40px',
  width: 320,
  '@media': {
    [max768]: {
      width: 'calc(100vw)',
    },
  },
});

export const navHeader = style({
  display: 'flex',
  flexDirection: 'row',
  height: '80px',
  alignItems: 'center',
  padding: '0px 24px',
});

export const navListTitle = style({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  color: '#fff',
  fontSize: 14,
  marginTop: '8px',
  paddingLeft: '12px',
  lineHeight: '32px',
});
