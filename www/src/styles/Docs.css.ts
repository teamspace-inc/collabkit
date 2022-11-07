import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { MAIN_BREAKPOINT } from '../hooks/useWindowSize';
import { vars } from './Theme.css';

globalStyle('code', {});

export const docs = style({});

const max768 = `screen and (max-width: ${MAIN_BREAKPOINT}px)`;

globalStyle(`${docs} blockquote`, {
  border: `1px solid ${vars.color.mint}`,
  color: vars.color.mint,
  textIndent: 0,
  marginLeft: 0,
  background: 'transparent',
  padding: '20px',
  borderRadius: '8px',
  fontSize: 14,
  lineHeight: '24px',
});

globalStyle(`${docs} blockquote h4`, {
  fontSize: 14,
  lineHeight: '24px',
  color: vars.color.mint,
  margin: '0 0 4px',
});

globalStyle(`${docs} blockquote a`, {
  fontSize: 14,
  lineHeight: '24px',
  color: vars.color.mint,
  textDecoration: 'none',
});

globalStyle(`${docs} blockquote a:hover`, {
  textDecoration: 'underline',
});

globalStyle(`${docs} code`, {
  fontFamily: 'Monaco',
  fontSize: 14,
  background: vars.color.bgContrastLow,
  padding: '4px 6px',
  borderRadius: '6px',
  color: vars.color.mint,
});

globalStyle(`${docs} h1`, {
  marginTop: 0,
  fontWeight: '700',
  color: vars.color.textContrastHigh,
});

globalStyle(`${docs} p`, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  margin: '28px auto',
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} h2`, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 24,
  lineHeight: '34px',
  marginBottom: '16px',
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} table`, {
  width: '100%',
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} table tr`, {
  borderBottom: `1px solid ${vars.color.bgContrastMedium}`,
});

globalStyle(`${docs} table tbody tr:last-child`, {
  borderBottom: `none`,
});

globalStyle(`${docs} table td, ${docs} table th`, {
  fontSize: 16,
  padding: '16px 16px 16px 0px',
  wordBreak: 'break-word',
});

globalStyle(`${docs} table td code`, {
  fontSize: 14,
  padding: '2px 4px',
});

globalStyle(`${docs} table td`, {
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} table td a`, {
  fontSize: 13,
});

globalStyle(`${docs} table th`, {
  fontSize: '13px',
  textAlign: 'left',
  fontWeight: 'normal',
  paddingBottom: '16px',
});

globalStyle(`${docs} h3`, {
  marginTop: '12px',
  marginBottom: '20px',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '28px',
  color: vars.color.textContrastHigh,
  position: 'relative',
});

globalStyle(`${docs} h4`, {
  marginTop: '8px',
  marginBottom: '12px',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '26px',
  color: vars.color.textContrastHigh,
});

globalStyle(`body`, {
  counterReset: 'step-number',
});

export const docStep = style({
  counterIncrement: 'step-number',
  ':before': {
    content: `counter(step-number)`,
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    height: '28px',
    width: '28px',
    textIndent: '-1px',
    lineHeight: '28px',
    color: `hsla(0, 0%, 11%, 1)`,
    background: vars.color.mint,
    borderRadius: '50%',
    position: 'absolute',
    left: -32 - 16,
  },
});

export const advancedAnatomyPartNumber = style([docStep, {}]);

export const docDemoOverlay = style({
  fontSize: 14,
  padding: 20,
  fontWeight: '700',
  color: 'rgba(255,255,255,0.75)',
});

export const docDemoContainer = style({
  flex: 1,
  display: 'flex',
  borderRadius: '8px',
  padding: '100px 20px',
  boxSizing: 'border-box',
  width: '100%',
  margin: '0',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid ' + vars.color.bgContrastMedium,
});

export const themeDemoContainer = style([
  docDemoContainer,
  {
    borderRadius: '0px',
    clipPath: 'unset !important',
    background: 'transparent !important',
    height: '100% !important',
    flex: 1,
  },
]);

export const docScrollableContent = style({
  padding: 20,
  gridTemplateColumns: 'minmax(360px, 666px)',
  display: 'grid',
  width: 'auto',
  position: 'sticky',
  top: 0,
  boxSizing: 'border-box',

  wordWrap: 'break-word',
  flex: 1,
  lineHeight: '28px',
  '@media': {
    [max768]: {
      width: '100%',
    },
  },
});

export const docScrollableContentWrap = style({
  height: '100vh',
  borderLeft: '1px solid #333',
  borderColor: vars.color.bgContrastLow,

  '@media': {
    [max768]: {
      borderLeft: 'none',
    },
  },
});

export const docNav = style({
  position: 'sticky',
  top: 0,
  background: '#1C1C1C',
  color: 'white',
  display: 'flex',
  height: '100vh',
  alignItems: 'flex-end',

  '@media': {
    [max768]: {
      background: '#1C1C1C',
      alignItems: 'flex-start',
      borderRight: 'none',
    },
  },
});

export const docFooterLink = style({
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  alignItems: 'flex-start',
  flex: 1,
});

export const docFooter = style({
  marginTop: 60,
  borderTop: '1px solid #3D3D3D',
  paddingTop: 20,
  paddingBottom: 200,
  color: '#BBBBBB',
  fontFamily: 'Inter',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '28px',
});

export const docLink = style({
  borderRadius: '6px',
  textDecoration: 'none',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '34px',
  color: `${vars.color.mint} !important`,
  cursor: 'pointer !important',

  selectors: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export const docContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  flex: 1,
});

export const docRoot = style({
  color: vars.color.textContrastMedium,
  background: '#1C1C1C',
  position: 'fixed',
  inset: 0,
  alignItems: 'flex-start',
  display: 'grid',
  gridTemplateColumns: 'minmax(280px, 1fr) minmax(500px, 3fr)',
  '@media': {
    [max768]: {
      display: 'unset',
    },
  },
});

export const docTitle = style({
  display: 'block',
  margin: '0px !important',
  padding: '56px 0px 12px',
  boxSizing: 'border-box',
  lineHeight: '56px',
  fontSize: '40px',
  wordBreak: 'break-word',
  '@media': {
    [max768]: {
      padding: '32px 0px 32px',
    },
  },
});

export const navOl = style({
  listStyle: 'none',
  boxSizing: 'border-box',
  padding: '0px 12px 0px 12px',
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [max768]: {
      paddingRight: '24px',
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

export const navLogoOuter = style({
  flex: 1,
  cursor: 'pointer',
  display: 'flex',
});

export const navLogoInner = style({
  width: 290,
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
