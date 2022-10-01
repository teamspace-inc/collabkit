import { createVar, style } from '@vanilla-extract/css';
import { vars } from './themes.css';

const ltr = style({
  textAlign: 'left',
});
const rtl = style({
  textAlign: 'right',
});

export const placeholder = style({
  color: vars.composer.placeholder.color,
  fontSize: vars.composer.placeholder.fontSize,
  lineHeight: vars.composer.placeholder.lineHeight,
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '50%',
  transform: 'translateY(-50%)',
  left: vars.space[2],
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
});

const paragraph = style({
  margin: 0,
  position: 'relative',
});

export const lexicalTheme = {
  ltr,
  rtl,
  placeholder,
  paragraph,
};

export const contentEditable = style({
  resize: 'none',
  caretColor: vars.composer.body.caretColor,
  color: vars.composer.body.color,
  fontSize: vars.composer.body.fontSize,
  lineHeight: vars.composer.body.lineHeight,
  padding: vars.composer.body.padding,
  position: 'relative',
  tabSize: 1,
  boxSizing: 'border-box',
  outline: 0,
  width: '100%',
});

export const root = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: `0 ${vars.space[4]}`,
});

export const editor = style({
  background: vars.composer.background,
  border: vars.composer.border,
  borderRadius: vars.composer.borderRadius,
  flex: '1',
  width: '100%',
  position: 'relative',
  verticalAlign: 'top',
  boxSizing: 'border-box',
});
