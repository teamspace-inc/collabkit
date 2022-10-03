import { style } from '@vanilla-extract/css';
import { vars } from './themes.css';

export const root = style({
  boxSizing: 'border-box',
  height: '100%',
  background: vars.color.background,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  position: 'fixed',
  top: 0,
  width: vars.inbox.width,
  paddingTop: vars.space[4],
  paddingBottom: vars.space[4],
  right: 0,
  bottom: 0,
});

export const title = style({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: vars.text.large.fontSize,
  color: vars.color.textPrimary,
  lineHeight: '153%',
  letterSpacing: -0.25,
  margin: 0,
  display: 'flex',
  alignItems: 'space-between',
  paddingLeft: vars.inbox.item.paddingLeft,
  paddingRight: vars.inbox.item.paddingRight,
  paddingBottom: vars.space[3],
  // borderBottom: '1px solid #E3E9ED',
});
