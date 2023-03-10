import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { docs } from '../docs/Docs.css';
import { dark, light, vars } from '../Theme.css';

export const codeEditor = recipe({
  base: {
    position: 'relative',
    flex: 1,
    background: vars.color.bgContrastLowest,
    opacity: 0,
    WebkitFontSmoothing: 'antialiased',
  },
  variants: {
    isSnippet: {
      true: {
        padding: '16px 20px 16px 0px',
        borderRadius: 8,
      },
      false: {},
    },
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

globalStyle(`${dark} ${docs} .monaco-editor .lines-content .core-guide-indent`, {
  boxShadow: `1px 0 0 0 ${vars.color.bgContrastHigh} inset`,
});

globalStyle(`${dark} ${docs} .monaco-editor .scroll-decoration`, {
  boxShadow: `${vars.color.bgContrastLowest} 0 6px 6px -6px inset`,
});

globalStyle(
  `${dark} ${docs}  .monaco-editor .cldr.codicon.codicon-folding-expanded, .monaco-editor .cldr.codicon.codicon-folding-collapsed`,
  {}
);

globalStyle(`${dark} ${docs} .mtk42`, {
  fontWeight: '600',
  color: vars.color.sky,
});

globalStyle(`${dark} ${docs} .mtk6`, {
  color: vars.color.teal,
  fontStyle: 'normal',
  fontWeight: 'normal !important',
});

globalStyle(`${dark} ${docs} .mtk7`, { color: vars.color.yellow });
globalStyle(`${dark} ${docs} .mtk1`, { color: vars.color.cyan });
globalStyle(`${dark} ${docs} .mtk16`, { color: 'white' });
globalStyle(`${dark} ${docs} .mtk5`, { color: vars.color.orange });

globalStyle(`${dark} ${docs} .mtk39`, { color: vars.color.primary });

globalStyle(`${dark} ${docs} .monaco-editor .monaco-hover`, {
  background: vars.color.bgContrastLow,
  border: 'none',
});

globalStyle(`${dark} ${docs} .monaco-editor`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${dark} ${docs} .monaco-editor .margin`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${dark} ${docs} .monaco-editor .monaco-editor-background`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${dark} ${docs} .monaco-editor .goto-definition-link`, {
  color: `${vars.color.purple} !important`,
});

globalStyle(`${light} ${docs} .monaco-editor .lines-content .core-guide-indent`, {
  boxShadow: `1px 0 0 0 ${vars.color.bgContrastHigh} inset`,
});

globalStyle(`${light} ${docs} .monaco-editor .scroll-decoration`, {
  boxShadow: `${vars.color.bgContrastLowest} 0 6px 6px -6px inset`,
});

globalStyle(
  `${light} ${docs}  .monaco-editor .cldr.codicon.codicon-folding-expanded, .monaco-editor .cldr.codicon.codicon-folding-collapsed`,
  {}
);

globalStyle(`${light} ${docs} .mtk42`, {
  fontWeight: '600',
  color: vars.color.purple,
});

globalStyle(`${light} ${docs} .mtk6`, {
  color: vars.color.purple,
  fontStyle: 'normal',
  fontWeight: 'normal !important',
});

globalStyle(`${light} ${docs} .mtk7`, { color: vars.color.yellow });
globalStyle(`${light} ${docs} .mtk1`, { color: vars.color.cyan });
globalStyle(`${light} ${docs} .mtk16`, { color: vars.color.textContrastHigh });
globalStyle(`${light} ${docs} .mtk5`, { color: vars.color.orange });

globalStyle(`${light} ${docs} .mtk39`, { color: vars.color.pink });

globalStyle(`${light} ${docs} .monaco-editor .monaco-hover`, {
  background: vars.color.bgContrastLow,
  border: 'none',
});

globalStyle(`${light} ${docs} .monaco-editor`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${light} ${docs} .monaco-editor .margin`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${light} ${docs} .monaco-editor .monaco-editor-background`, {
  backgroundColor: 'transparent !important',
});

globalStyle(`${light} ${docs} .monaco-editor .goto-definition-link`, {
  color: `${vars.color.purple} !important`,
});
