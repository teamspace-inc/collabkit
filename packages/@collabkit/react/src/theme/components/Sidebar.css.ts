import { fallbackVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const root = style({
  boxSizing: 'border-box',
  height: '100%',
  background: fallbackVar(vars.sidebar.background, vars.color.background),
  boxShadow: fallbackVar(vars.sidebar.boxShadow, vars.shadow.high),
  position: 'fixed',
  top: 0,
  width: fallbackVar(vars.inbox.width, '292px'),
  right: 0,
  bottom: 0,
  fontFamily: vars.fontFamily,
});

export const scrollarea = style({
  flex: 1,
  height: `calc(100vh - ${calc(vars.sidebar.title.lineHeight)
    .add(vars.sidebar.title.paddingBottom)
    .add(vars.sidebar.title.paddingTop)
    .add(vars.sidebar.title.paddingBottom)
    .toString()})`,
  fontFamily: vars.fontFamily,
});

export const title = style({
  fontWeight: fallbackVar(vars.sidebar.title.fontWeight, vars.fontWeight.bold),
  fontSize: fallbackVar(vars.sidebar.title.fontSize, vars.text.large.fontSize),
  color: fallbackVar(vars.sidebar.title.color, vars.color.textPrimary),
  lineHeight: fallbackVar(vars.sidebar.title.lineHeight, vars.text.large.lineHeight),
  letterSpacing: fallbackVar(vars.sidebar.title.letterSpacing, vars.text.large.letterSpacing),
  margin: 0,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: fallbackVar(vars.inbox.item.paddingLeft, vars.space[4]),
  paddingRight: fallbackVar(vars.inbox.item.paddingRight, vars.space[4]),
  borderBottom: fallbackVar(vars.sidebar.title.borderBottom, '2px solid'),
  borderBottomColor: fallbackVar(vars.sidebar.title.borderBottomColor, vars.color.border),
  fontFamily: vars.fontFamily,
});

export const iconButton = recipe({
  base: {
    padding: 12,
    paddingTop: 10.25,
    paddingBottom: 10.25,
    cursor: 'pointer',
    userSelect: 'none',
    pointerEvents: 'all',
    
    selectors: {
      '&:active': {
        background: fallbackVar(vars.iconButton.hover.background, vars.color.surfaceOverlay),
      },
      '&:hover': {
        background: fallbackVar(vars.iconButton.hover.background, vars.color.surfaceOverlay),
      },
    },
  },
  variants: {
    active: {
      true: {
        background: fallbackVar(vars.iconButton.hover.background, vars.color.surfaceOverlay),
      },
    },
  },
});
