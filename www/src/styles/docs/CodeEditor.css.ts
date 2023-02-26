import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { docs } from '../docs/Docs.css';
import { vars } from '../Theme.css';

export const codeEditor = recipe({
  base: {
    position: 'relative',
    padding: '16px 20px 16px 0px',
    borderRadius: 8,
    flex: 1,
    background: vars.color.bgContrastLowest,
    opacity: 0,
    WebkitFontSmoothing: 'antialiased',
  },
  variants: {
    didMount: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

export const copyButton = style({
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: '50%',
  background: 'transparent',
  cursor: 'pointer',
  ':hover': {
    background: vars.color.bgContrastLow,
  },
  ':active': {
    background: vars.color.bgContrastLowest,
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

globalStyle(`${docs} .mtk42`, {
  fontWeight: '600',
  color: vars.color.sky,
});

globalStyle(`${docs} .mtk6`, {
  color: vars.color.teal,
  fontStyle: 'normal',
  fontWeight: 'normal !important',
});

globalStyle(`${docs} .mtk7`, { color: vars.color.yellow });
globalStyle(`${docs} .mtk1`, { color: vars.color.cyan });
globalStyle(`${docs} .mtk16`, { color: 'white' });
globalStyle(`${docs} .mtk5`, { color: vars.color.orange });

globalStyle(`${docs} .mtk39`, { color: vars.color.yellow });

globalStyle(`${docs} .monaco-editor .monaco-hover`, {
  background: vars.color.bgContrastLow,
  border: 'none',
});

globalStyle(`${docs} .monaco-editor`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${docs} .monaco-editor .margin`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${docs} .monaco-editor .monaco-editor-background`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${docs} .monaco-editor .goto-definition-link`, {
  color: `${vars.color.purple} !important`,
});
