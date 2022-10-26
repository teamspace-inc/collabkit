import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme';

export const menu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  cursor: 'pointer',
  pointerEvents: 'all',
  minWidth: 110,
  borderRadius: fallbackVar(vars.menu.borderRadius, vars.space[1]),
  background: fallbackVar(vars.menu.background, vars.color.surface),
  boxShadow: fallbackVar(vars.menu.boxShadow, vars.shadow.standard),
  outline: 'none',
  fontFamily: vars.fontFamily,

  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const menuItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  border: 'none',
  textAlign: 'left',
  margin: 0,
  outline: 0,
  padding: `${vars.space[1]} ${vars.space[2]}`,
  borderRadius: vars.space[1],
  cursor: 'pointer',
  background: fallbackVar(vars.menu.background, vars.color.surface),
  color: fallbackVar(vars.menu.item.color, vars.color.textPrimary),
  fontSize: fallbackVar(vars.menu.item.fontSize, vars.text.small.fontSize),
  lineHeight: fallbackVar(vars.menu.item.lineHeight, vars.text.small.lineHeight),
  fontWeight: fallbackVar(vars.menu.item.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.menu.item.letterSpacing, vars.text.small.letterSpacing),
  fontFamily: vars.fontFamily,

  selectors: {
    '&:focus, &:not([disabled]):active': {
      color: fallbackVar(vars.menu.item.active.color, vars.color.textPrimary),
      background: fallbackVar(vars.menu.item.active.background, vars.color.surfaceOverlay),
    },
    '&:not(:first-of-type)': {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
    '&:not(:last-of-type)': {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
});
