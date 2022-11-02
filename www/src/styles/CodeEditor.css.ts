import { globalStyle, style } from '@vanilla-extract/css';
import { docs } from './Docs.css';
import { vars } from './Theme.css';

export const codeEditor = style({
  position: 'relative',
  padding: '16px 20px 16px 0px',
  borderRadius: 8,
  flex: 1,
  border: `1px solid ${vars.color.bgContrastMedium}`,
});

export const copyButton = style({
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 11,
  right: 11,
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: vars.color.bgContrastLow,
  cursor: 'pointer',
  ':hover': {
    background: vars.color.bgContrastMedium,
  },
});

globalStyle(`${docs} .monaco-editor .lines-content .core-guide-indent`, {
  boxShadow: `1px 0 0 0 ${vars.color.bgContrastHigh} inset`,
});

globalStyle(`${docs} .monaco-editor .scroll-decoration`, {
  boxShadow: `${vars.color.bgContrastLowest} 0 6px 6px -6px inset`,
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
  color: '#6BD1C7',
});

globalStyle(`${docs} .mtk6`, {
  color: vars.color.teal,
  fontStyle: 'normal',
  fontWeight: 'normal !important',
});

globalStyle(`${docs} .mtk7`, { color: vars.color.yellow });
globalStyle(`${docs} .mtk1`, { color: vars.color.mint });
globalStyle(`${docs} .mtk16`, { color: 'white' });
globalStyle(`${docs} .mtk5`, { color: vars.color.orange });

globalStyle(`${docs} .mtk39`, { color: vars.color.yellow });

globalStyle(`${docs} .monaco-editor .monaco-hover`, {
  background: vars.color.bgContrastLow,
  border: 'none',
});

globalStyle(`${docs} .monaco-editor .goto-definition-link`, {
  color: `${vars.color.purple} !important`,
});
