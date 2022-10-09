import { globalStyle, style } from '@vanilla-extract/css';
import { docs } from './Docs.css';
import { vars } from './Theme.css';

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
globalStyle(`${docs} .mtk5`, { color: vars.color.textContrastMedium });
