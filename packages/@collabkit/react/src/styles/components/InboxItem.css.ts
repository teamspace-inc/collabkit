import { fallbackVar, style } from '@vanilla-extract/css';
import { name as profileName } from './Profile.css';
import { timestamp as commentTimestamp, body as commentBody } from './Comment.css';
import { vars } from '../theme';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

export const replyCount = style({
  color: fallbackVar(vars.inbox.item.replyCount.color, vars.color.textSecondary),
  fontSize: fallbackVar(vars.inbox.item.replyCount.fontSize, vars.text.small.fontSize),
  lineHeight: fallbackVar(vars.inbox.item.replyCount.lineHeight, vars.text.small.lineHeight),
  fontWeight: fallbackVar(vars.inbox.item.replyCount.fontWeight, vars.fontWeight.regular),
  letterSpacing: fallbackVar(
    vars.inbox.item.replyCount.letterSpacing,
    vars.text.small.letterSpacing
  ),
  fontFamily: vars.fontFamily,
});

export const name = style([profileName, {}]);

export const commentRoot = style([
  {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontFamily: vars.fontFamily,
  },
]);

export const body = style([
  commentBody,
  {
    lineClamp: 3,
    overflow: 'hidden',
    // textOverflow: 'ellipsis',
  },
]);

export const nameAndTimestampWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: '8px',
  fontFamily: vars.fontFamily,
});

export const unreadDot = style({
  width: fallbackVar(vars.inbox.item.unreadDot.width, vars.space[2]),
  height: fallbackVar(vars.inbox.item.unreadDot.height, vars.space[2]),
  borderRadius: fallbackVar(vars.inbox.item.unreadDot.borderRadius, '50%'),
  background: fallbackVar(vars.inbox.item.unreadDot.background, vars.color.attention),
  position: 'absolute',
  left: `${calc(vars.inbox.item.paddingLeft).subtract(vars.inbox.item.unreadDot.width).negate()}`,
  fontFamily: vars.fontFamily,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  fontFamily: vars.fontFamily,
});

export const timestamp = style([
  commentTimestamp,
  {
    fontWeight: fallbackVar(vars.inbox.item.timestamp.fontWeight, '400'),

    fontSize: fallbackVar(vars.inbox.item.timestamp.fontSize, vars.text.small.fontSize),
    lineHeight: fallbackVar(vars.inbox.item.timestamp.lineHeight, vars.text.small.lineHeight),
    letterSpacing: fallbackVar(
      vars.inbox.item.timestamp.letterSpacing,
      vars.text.small.letterSpacing
    ),
    color: fallbackVar(vars.inbox.item.timestamp.color, vars.color.textSecondary),
  },
]);

export const root = recipe({
  base: {
    display: 'flex',
    borderBottom: fallbackVar(vars.inbox.item.borderBottom, `none`),
    flexDirection: 'column',
    flex: 1,
    cursor: 'pointer',
    boxSizing: 'border-box',
    background: fallbackVar(vars.color.background, vars.color.background),
    paddingTop: fallbackVar(vars.inbox.item.paddingTop, vars.space[4]),
    paddingBottom: fallbackVar(vars.inbox.item.paddingBottom, vars.space[4]),
    paddingLeft: fallbackVar(vars.inbox.item.paddingLeft, vars.space[4]),
    paddingRight: fallbackVar(vars.inbox.item.paddingRight, vars.space[4]),
    userSelect: 'none',
    fontFamily: vars.fontFamily,
    gap: '12px',
    selectors: {
      '&:hover': {
        background: fallbackVar(vars.color.surfaceOverlay, vars.color.surface),
      },
      '&:last-of-type': {
        marginBottom: fallbackVar(vars.inbox.item.paddingBottom, vars.color.surface),
      },
    },
  },

  variants: {
    active: {
      true: {
        background: fallbackVar(vars.inbox.item.active.background, vars.color.surfaceOverlay),
      },
    },
  },
});
