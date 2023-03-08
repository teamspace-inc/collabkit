import { style } from '@vanilla-extract/css';
import { vars } from './Theme.css';

export const themeEditor = style({});

export const codeEditor = style({
  position: 'relative',
  display: 'grid',
  background: vars.color.bgContrastLowest,
  gridTemplateColumns: '1fr',
  boxSizing: 'border-box',
});

export const themeEditorModal = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.666)',
  zIndex: 9998,
  justifyContent: 'center',
  alignItems: 'center',
});

export const themeEditorModalHeader = style({
  background: vars.color.bgContrastFloor,
});

export const themeEditorModalHeaderLeft = style({
  background: vars.color.mint,
});

export const themeEditorModalCloseButton = style({
  position: 'absolute',
  right: 8,
  top: 8,
  border: 'none',
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const themeEditorModalContent = style({
  display: 'grid',
  background: vars.color.mint,
  gridTemplateRows: '40px 1fr',
  gridTemplateColumns: '1fr 1fr',
  maxWidth: 1200,
  width: '100vw',
  height: '100vh',
  maxHeight: '800px',
  margin: 'auto',
  position: 'absolute',
  inset: 0,
  borderRadius: 6,
  alignSelf: 'center',
  zIndex: 9999,
  clipPath: 'inset(0% 0% 0% 0% round 6px)',
});

export const themeEditorModalPreview = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '20px',
});
