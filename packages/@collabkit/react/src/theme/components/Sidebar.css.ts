import { fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const root = style({
  boxSizing: 'border-box',
  background: fallbackVar(vars.sidebar.background, vars.color.background),
  borderLeft: fallbackVar(vars.sidebar.borderLeft, `1px solid ${vars.color.border}`),
  boxShadow: fallbackVar(vars.sidebar.boxShadow, 'unset'),
  width: fallbackVar(vars.inbox.width, '320px'),
  fontFamily: vars.fontFamily,
  position: 'relative',
  height: '100%',
});

export const title = style({
  fontSize: fallbackVar(vars.sidebar.title.fontSize, vars.text.large.fontSize),
  fontWeight: fallbackVar(vars.sidebar.title.fontWeight, vars.fontWeight.bold),
  color: fallbackVar(vars.sidebar.title.color, vars.color.textPrimary),
  lineHeight: fallbackVar(vars.sidebar.title.lineHeight, vars.text.large.lineHeight),
  letterSpacing: fallbackVar(vars.sidebar.title.letterSpacing, vars.text.large.letterSpacing),
});

export const header = style({
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
  borderBottom: fallbackVar(vars.sidebar.title.borderBottom, '1px solid'),
  borderBottomColor: fallbackVar(vars.sidebar.title.borderBottomColor, vars.color.border),
  fontFamily: vars.fontFamily,
  paddingTop: vars.space[1],
  paddingBottom: vars.space[1],
});

export const iconButton = recipe({
  base: {
    padding: 12,
    paddingTop: 10.25,
    paddingBottom: 10.25,
    userSelect: 'none',
    pointerEvents: 'all',
    // Hidden till we have notifications ready
    // cursor: 'pointer',
    visibility: 'hidden',

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
