import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const menu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  cursor: 'pointer',
  pointerEvents: 'all',
  minWidth: 110,
  borderRadius: fallbackVar(vars.menu.borderRadius, '4px'),
  background: fallbackVar(vars.menu.background, vars.color.surface),
  border: `1px solid ${vars.color.border}`,
  boxShadow: fallbackVar(vars.menu.boxShadow, vars.shadow.standard),
  outline: 'none',
  fontFamily: vars.fontFamily,
  zIndex: vars.zIndex.floating,

  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const menuItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  border: 'none',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  margin: 0,
  outline: 0,
  padding: `${vars.space[1]} ${vars.space[2]}`,
  borderRadius: 5,
  cursor: 'pointer',
  background: fallbackVar(vars.menu.background, vars.color.surface),
  color: fallbackVar(vars.menu.item.color, vars.color.textPrimary),
  fontSize: fallbackVar(vars.menu.item.fontSize, vars.text.base.fontSize),
  lineHeight: fallbackVar(vars.menu.item.lineHeight, vars.text.base.lineHeight),
  fontWeight: fallbackVar(vars.menu.item.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(vars.menu.item.letterSpacing, vars.text.base.letterSpacing),
  fontFamily: vars.fontFamily,

  selectors: {
    '&:focus, &:not([disabled]):active': {
      color: fallbackVar(vars.menu.item.active.color, vars.menu.item.color, vars.color.textPrimary),
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
    '&:hover': {
      color: fallbackVar(vars.menu.item.hover.color, vars.menu.item.color, vars.color.textPrimary),
      background: fallbackVar(vars.menu.item.hover.background, vars.color.surfaceOverlay),
    },
  },
});

export const checkBoxMenuItem = style([menuItem]);

export const checkBoxMenuItemLabel = style({
  marginLeft: vars.space[2],
});
