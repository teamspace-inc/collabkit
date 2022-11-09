import { globalStyle, style } from '@vanilla-extract/css';
import { MAIN_BREAKPOINT } from '../hooks/useWindowSize';
import { HEADER_HEIGHT } from './Header.css';
import { vars } from './Theme.css';

globalStyle('code', {});

export const docs = style({});

// todo move to root styles
export const max768 = `screen and (max-width: ${MAIN_BREAKPOINT}px)`;

export const inset = style({
  padding: '0 0 0 40px',
});

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
  color: vars.color.cyan,
});

globalStyle(`${docs} code.ReactNode`, {
  fontWeight: 'bold',
  color: vars.color.sky,
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
  color: vars.color.textContrastHigh,
});

globalStyle(`${docs} table`, {
  width: '100%',
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} table tr`, {
  borderBottom: `1px solid ${vars.color.bgContrastMedium}`,
});

globalStyle(`${docs} table tbody tr:last-of-type`, {
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
  fontSize: 14,
});

globalStyle(`${docs} table th`, {
  fontSize: '14px',
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
    left: -44,
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
    border: 'none',
  },
]);

export const docScrollableContent = style({
  padding: 20,
  paddingTop: 72,
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
  maxWidth: 1124,
  inset: 0,
  alignItems: 'flex-start',
  display: 'grid',
  height: '100%',
  overflow: 'hidden',
  gridTemplateColumns: 'minmax(320px, 1fr) minmax(500px, 3fr)',
  '@media': {
    [max768]: {
      display: 'unset',
    },
  },
});

export const docBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  flex: 1,
});

export const docRoot = style({
  color: vars.color.textContrastMedium,
  background: vars.color.bgContrastFloor,
  display: 'flex',
  justifyContent: 'center',
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
