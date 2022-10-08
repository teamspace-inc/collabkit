import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from './Theme.css';

globalStyle('code', {});

export const docs = style({});

export const codeEditor = style({
  position: 'relative',
  display: 'grid',
  padding: '20px',
  background: vars.color.bgContrastLow,
  borderRadius: 8,
  gridTemplateColumns: '1fr',
});

globalStyle(`${docs} .monaco-editor .lines-content .core-guide-indent`, {
  boxShadow: `1px 0 0 0 ${vars.color.bgContrastHigh} inset`,
});

globalStyle(
  `${docs}  .monaco-editor .cldr.codicon.codicon-folding-expanded, .monaco-editor .cldr.codicon.codicon-folding-collapsed`,
  {}
);

globalStyle(`${docs} a`, {
  color: vars.color.yellow,
});

globalStyle(`${docs} .mtk42`, {
  fontWeight: '700',
  color: vars.color.sky,
});

globalStyle(`${docs} .mtk6`, {
  color: vars.color.textContrastMedium,
  fontStyle: 'normal',
  fontWeight: 'normal !important',
});

globalStyle(`${docs} .mtk7`, { color: vars.color.yellow });
globalStyle(`${docs} .mtk1`, { color: vars.color.textContrastLow });
globalStyle(`${docs} .mtk39`, { color: vars.color.yellow });
globalStyle(`${docs} .mtk16`, { color: 'white' });

globalStyle(`${docs} blockquote`, {
  borderLeft: `5px solid ${vars.color.sky}`,
  textIndent: 0,
  paddingLeft: 20,
  marginLeft: 0,
});

globalStyle(`${docs} code`, {
  fontFamily: 'Monaco',
  fontSize: 14,
  background: vars.color.bgContrastLow,
  padding: '4px 6px',
  borderRadius: '6px',
  color: vars.color.sky,
});

globalStyle(`${docs} h1`, {
  marginTop: 0,
  color: vars.color.textContrastHigh,
});

globalStyle(`${docs} p`, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} h2`, {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 24,
  lineHeight: '34px',
  color: vars.color.textContrastMedium,
});

globalStyle(`${docs} h3`, {
  marginTop: '12px',
  marginBottom: '20px',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '28px',
  color: vars.color.textContrastHigh,
  position: 'relative',
});

globalStyle(`${docs} h4`, {
  marginTop: '32px',
  marginBottom: '8px',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '26px',
  color: vars.color.textContrastHigh,
});

export const docStep = style({
  ':before': {
    content: `attr(data-step-number)`,
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    height: '28px',
    width: '28px',
    textIndent: '-1px',
    lineHeight: '29px',
    color: vars.color.textContrastHigh,
    background: vars.color.bgContrastLow,
    borderRadius: '50%',
    position: 'absolute',
    left: -28 - 16,
  },
});

export const docDemoOverlay = style({
  fontSize: 14,
  padding: 20,
  fontWeight: '700',
  color: 'rgba(255,255,255,0.75)',
});

export const docDemoContainer = style({
  flex: 1,
  backgroundColor: vars.color.violet,
  display: 'flex',
  borderRadius: '6px',
  padding: '100px 20px',
  boxSizing: 'border-box',
  width: '100%',
  margin: '0',
  justifyContent: 'center',
  alignItems: 'center',
});

export const docScrollableContent = style({
  padding: 20,
  width: 760,
  display: 'table',
  margin: '0 auto',
  height: '100vh',
  position: 'sticky',
  top: 0,
  boxSizing: 'border-box',

  wordWrap: 'break-word',
  flex: 1,
  lineHeight: '28px',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
    },
  },
});

export const docNav = style({
  position: 'sticky',
  top: 0,
  background: '#222',
  color: 'white',
  display: 'flex',
  height: '100vh',
  alignItems: 'flex-end',
  '@media': {
    'screen and (max-width: 768px)': {
      background: '#222',
      alignItems: 'flex-start',
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
  textDecorationLine: 'underline',
  color: '#FFEC6B',
  cursor: 'pointer !important',
});

export const docContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  flex: 1,
});

export const docRoot = style({
  color: '#BBBBBB',
  background: '#222',
  position: 'fixed',
  inset: 0,
  alignItems: 'flex-start',
  display: 'grid',
  gridTemplateColumns: 'minmax(400px, 1fr) minmax(780px, 3fr)',
  '@media': {
    'screen and (max-width: 768px)': {
      display: 'unset',
    },
  },
});

export const docTitle = style({
  display: 'block',
  margin: '0px !important',
  padding: '56px 0px 32px',
  boxSizing: 'border-box',
  lineHeight: '56px',
  fontSize: '40px',
  wordBreak: 'break-word',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '32px 0px 32px',
    },
  },
});

globalStyle(`${docs} ol ol`, {
  marginTop: 0,
  marginBottom: 8,
  paddingLeft: 0,
  textIndent: '20px',
  paddingRight: 0,
  display: 'flex',
  flex: 1,
});

export const navOl = style({
  listStyle: 'none',
  boxSizing: 'border-box',
  padding: '0px 56px 0px 12px',
  gap: '4px',
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    'screen and (max-width: 768px)': {
      paddingRight: '24px',
    },
  },
});

export const navLi = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  '@media': {
    'screen and (max-width: 768px)': {
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
    color: vars.color.textContrastHigh,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    ':hover': {
      background: 'rgba(255, 255, 255, 0.04)',
      cursor: 'pointer',
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
