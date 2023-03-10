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
  background: 'red',
});

export const themeEditorDialogOverlay = style({
  background: 'rgba(0,0,0,0.9)',
  zIndex: 3,
});

export const themeEditorModalHeader = style({
  background: vars.color.bgContrastFloor,
});

export const themeEditorModalHeaderLeft = style({
  background: vars.color.bgContrastFloor,
});

export const themeEditorModalCloseButton = style({
  position: 'absolute',
  right: 20,
  top: 16,
  border: 'none',
  borderRadius: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  width: 28,
  height: 28,
  backgroundColor: vars.color.bgContrastMedium,
  cursor: 'pointer',
  color: vars.color.textContrastLow,
  ':hover': {
    backgroundColor: vars.color.bgContrastHigh,
  },
});

export const themeEditorComponentTitle = style({
  display: 'flex',
  paddingLeft: '20px !important',
  marginTop: '24px !important',
  color: vars.color.textContrastLow,
  fontSize: '20px !important',
  fontWeight: '600 !important',
});

export const themeEditorModalContent = style({
  display: 'grid',
  background: vars.color.bgContrastFloor,
  gridTemplateColumns: '1fr 1fr',
  maxWidth: 1200,
  width: '100vw',
  height: '100vh',
  boxShadow: '0 20px 40px 80px rgba(0,0,0,1)',
  maxHeight: '800px',
  margin: 'auto',
  position: 'absolute',
  inset: 0,
  borderRadius: 6,
  alignSelf: 'center',
  clipPath: 'inset(0% 0% 0% 0% round 6px)',
});

export const themeEditorModalPreview = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: '100%',
  padding: '20px',
});
