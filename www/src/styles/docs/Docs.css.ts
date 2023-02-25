import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { MAIN_BREAKPOINT } from '../../hooks/useWindowSize';
import { HEADER_HEIGHT } from '../Header.css';
import { vars } from '../Theme.css';

globalStyle('code', {});

export const docs = style({});

// todo move to root styles
export const max768 = `screen and (max-width: ${MAIN_BREAKPOINT}px)`;

export const inset = style({
  padding: '0 0 0 40px',
});

const navWidth = '272px';

globalStyle(`${docs} blockquote`, {
  border: `1px solid ${vars.color.mint}`,
  color: vars.color.mint,
  textIndent: 0,
  marginLeft: 0,
  background: 'transparent',
  padding: 20,
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

globalStyle(`${docs} h4`, {
  fontSize: 14,
  lineHeight: '24px',
  margin: '0 0 4px',
});

globalStyle(`${docs} ul`, {
  fontSize: 'inherit',
  lineHeight: 'inherit',
  margin: 0,
  padding: '0 0px 0px 40px',
});

globalStyle(`${docs} ul li`, {
  fontSize: '16px',
  lineHeight: '28px',
});

globalStyle(`${docs} a`, {
  textDecoration: 'none',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: `${vars.color.mint} !important`,
  cursor: 'pointer !important',
});

globalStyle(`${docs} a:hover`, {
  textDecoration: 'underline',
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
  fontFamily: 'Monaco, monospace',
  fontSize: 14,
  color: vars.color.sky,
});

globalStyle(`${docs} code.ReactNode`, {
  fontWeight: 'regular',
  color: vars.color.sky,
});

globalStyle(`${docs} h1`, {
  margin: 0,
  marginBottom: 30,
  fontSize: 36,
  fontWeight: '700',
  color: vars.color.textContrastHigh,
});

globalStyle(`${docs} p`, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '28px',
  margin: '0px',
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} h2`, {
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: 24,
  lineHeight: '34px',
  marginTop: 0,
  marginBottom: '16px',
  color: vars.color.textContrastHigh,
});

globalStyle(`${docs} table`, {
  width: '100%',
  color: vars.color.textContrastHigh,
  borderCollapse: 'collapse',
});

globalStyle(`${docs} table tr`, {
  borderBottom: `1px solid ${vars.color.bgContrastMedium}`,
});

globalStyle(`${docs} table tbody tr:last-of-type`, {
  borderBottom: `none`,
});

globalStyle(`${docs} table td, ${docs} table th`, {
  fontSize: 16,
  lineHeight: '28px',
  padding: `16px 16px 16px 0px`,
  wordBreak: 'break-word',
});

globalStyle(`${docs} table td code`, {
  fontSize: 14,
  padding: '2px 4px',
});

globalStyle(`${docs} table td`, {
  color: vars.color.textContrastHigh,
});

globalStyle(`${docs} table td a`, {
  fontSize: 14,
});

globalStyle(`${docs} table th`, {
  fontSize: '14px',
  textAlign: 'left',
  fontWeight: 'normal',
  paddingBottom: '16px',
});

globalStyle(`${docs} h3`, {
  marginTop: '60px',
  marginBottom: '0px',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '24px',
  lineHeight: '28px',
  color: vars.color.textContrastHigh,
  position: 'relative',
});

globalStyle(`${docs} h4`, {
  marginTop: '30px',
  marginBottom: '0px',
  fontStyle: 'normal',
  fontWeight: 500,
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
    fontSize: 13,
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
    left: -44,
    top: 1,
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
    border: 'none',
  },
]);

export const docScrollableContent = style({
  padding: 56,
  marginTop: 112,
  gridTemplateColumns: 'minmax(240px, 1fr)',
  display: 'grid',
  width: 'auto',
  position: 'sticky',
  top: 0,
  boxSizing: 'border-box',

  wordWrap: 'break-word',
  flex: 1,
  '@media': {
    [max768]: {
      width: '100%',
      padding: 0,
    },
  },
});

export const docScrollableContentWrap = style({
  borderLeft: '1px solid #333',
  borderColor: vars.color.bgContrastLow,
  minHeight: '100vh',

  '@media': {
    [max768]: {
      borderLeft: 'none',
    },
  },
});

export const docNav = style({
  position: 'fixed',
  paddingTop: HEADER_HEIGHT,
  top: 0,
  background: vars.color.bgContrastFloor,
  color: 'white',
  display: 'flex',
  height: '100vh',
  alignItems: 'flex-end',

  '@media': {
    [max768]: {
      background: vars.color.bgContrastFloor,
      alignItems: 'flex-start',
      paddingTop: 60,
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
  maxWidth: '1152px',
  padding: 0,
  alignItems: 'flex-start',
  display: 'grid',
  height: '100%',
  overflow: 'hidden',
  gridTemplateColumns: `minmax(${navWidth}, 1fr) minmax(500px, 8fr)`,
  '@media': {
    [max768]: {
      display: 'unset',
    },
  },
});

export const docBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  flex: 1,
  maxWidth: '666px',
  width: 'calc(100vw - 40px)',
});

export const docRoot = style({
  color: vars.color.textContrastMedium,
  background: vars.color.bgContrastFloor,
  display: 'flex',
  justifyContent: 'center',
  WebkitFontSmoothing: 'auto',
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
      lineHeight: '40px',
      fontSize: '32px',
    },
  },
});

export const navOl = style({
  listStyle: 'none',
  boxSizing: 'border-box',
  padding: '0px',
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

globalStyle(`${navOl} ol li`, {
  textIndent: '16px',
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
  padding: '40px 12px 100px',
  width: navWidth,
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
  fontSize: 13,
  marginTop: '8px',
  paddingLeft: '12px',
  lineHeight: '32px',
});
