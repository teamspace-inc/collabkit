import { fallbackVar, style } from '@vanilla-extract/css';
import { name as profileName } from './Profile.css';
import { timestamp as commentTimestamp } from './Comment.css';
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
});

export const name = style([profileName, {}]);

export const commentRoot = style([
  {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
]);

export const nameAndTimestampWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: '8px',
});

export const unreadDot = style({
  width: fallbackVar(vars.inbox.item.unreadDot.width, vars.space[2]),
  height: fallbackVar(vars.inbox.item.unreadDot.height, vars.space[2]),
  borderRadius: fallbackVar(vars.inbox.item.unreadDot.borderRadius, '50%'),
  background: fallbackVar(vars.inbox.item.unreadDot.background, vars.color.attention),
  position: 'absolute',
  left: `${calc(vars.inbox.item.paddingLeft).subtract(vars.inbox.item.unreadDot.width).negate()}`,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const timestamp = style([
  commentTimestamp,
  {
    // fontStyle: 'normal',
    // fontWeight: 400,
    // fontSize: 14,
    // lineHeight: '160%',
    // letterSpacing: -0.1,
    // color: '#6A7278',
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
