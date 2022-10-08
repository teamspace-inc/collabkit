import { globalStyle, style } from '@vanilla-extract/css';
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
  backgroundColor: '#7166D3',
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
