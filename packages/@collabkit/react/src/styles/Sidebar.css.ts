import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { vars } from './theme';

export const root = style({
  boxSizing: 'border-box',
  height: '100%',
  background: vars.sidebar.background,
  boxShadow: vars.sidebar.boxShadow,
  position: 'fixed',
  top: 0,
  width: vars.inbox.width,
  right: 0,
  bottom: 0,
});

export const scrollarea = style({
  flex: 1,
  height: `calc(100vh - ${calc(vars.sidebar.title.lineHeight)
    .add(vars.sidebar.title.paddingBottom)
    .add(vars.sidebar.title.paddingTop)
    .add(vars.sidebar.title.paddingBottom)
    .toString()})`,
});

export const title = style({
  fontWeight: vars.sidebar.title.fontWeight,
  fontSize: vars.sidebar.title.fontSize,
  color: vars.sidebar.title.color,
  lineHeight: vars.sidebar.title.lineHeight,
  letterSpacing: vars.sidebar.title.letterSpacing,
  margin: 0,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'space-between',
  paddingTop: vars.sidebar.title.paddingTop,
  paddingBottom: vars.sidebar.title.paddingBottom,
  paddingLeft: vars.inbox.item.paddingLeft,
  paddingRight: vars.inbox.item.paddingRight,
  borderBottom: vars.sidebar.title.borderBottom,
});
