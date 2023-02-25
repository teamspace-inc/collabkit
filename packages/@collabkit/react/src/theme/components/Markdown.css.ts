import { style, globalStyle, fallbackVar } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const markdown = style({});
export const markdownLinksNotClickable = style({});

// since we are using a globalStyle we need to override any
// app specific styles
globalStyle(`${markdown} p`, {
  margin: '0',
  padding: '0',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)} !important`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)}`,
  color: `${fallbackVar(vars.comment.body.color, vars.color.textPrimary)}`,
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)}`,
  letterSpacing: `${fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing)}`,
  fontFamily: vars.fontFamily,
});

globalStyle(`${markdown} a`, {
  textDecoration: 'none',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)}`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}`,
  fontFamily: vars.fontFamily,
});

globalStyle(`${markdownLinksNotClickable} p`, {
  margin: '0',
  padding: '0',
  fontSize: `${fallbackVar(vars.comment.body.fontSize, vars.text.base.fontSize)}`,
  fontWeight: `${fallbackVar(vars.comment.body.fontWeight, vars.fontWeight.regular)}`,
  color: fallbackVar(vars.comment.body.color, vars.color.textPrimary),
  lineHeight: `${fallbackVar(vars.comment.body.lineHeight, vars.text.base.lineHeight)}`,
  letterSpacing: `${fallbackVar(vars.comment.body.letterSpacing, vars.text.base.letterSpacing)}`,
  fontFamily: vars.fontFamily,
});

globalStyle(`${markdownLinksNotClickable} a`, {
  textDecoration: 'none',
  fontWeight: `${fallbackVar(vars.mentions.pill.fontWeight, vars.fontWeight.bold)}`,
  color: `${fallbackVar(vars.mentions.pill.color, vars.color.textPrimary)}`,
  cursor: 'default',
  fontFamily: vars.fontFamily,
});
