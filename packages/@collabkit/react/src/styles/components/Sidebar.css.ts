import { fallbackVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../theme';

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
  paddingTop: fallbackVar(vars.sidebar.title.paddingTop, vars.space[4]),
  paddingBottom: fallbackVar(vars.sidebar.title.paddingBottom, vars.space[2]),
  paddingLeft: fallbackVar(vars.inbox.item.paddingLeft, vars.space[4]),
  paddingRight: fallbackVar(vars.inbox.item.paddingRight, vars.space[4]),
  borderBottom: fallbackVar(vars.sidebar.title.borderBottom, 'none'),
  fontFamily: vars.fontFamily,
});
