import { style } from '@vanilla-extract/css';
import { name as profileName } from './Profile.css';
import { timestamp as commentTimestamp } from './Comment.css';
import { vars } from './themes.css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

export const replyCount = style({
  color: vars.inbox.item.replyCount.color,
  fontSize: vars.inbox.item.replyCount.fontSize,
  lineHeight: vars.inbox.item.replyCount.lineHeight,
  fontWeight: vars.inbox.item.replyCount.fontWeight,
  letterSpacing: vars.inbox.item.replyCount.letterSpacing,
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
  width: vars.inbox.item.unreadDot.width,
  height: vars.inbox.item.unreadDot.height,
  borderRadius: vars.inbox.item.unreadDot.borderRadius,
  background: vars.inbox.item.unreadDot.background,
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
    borderBottom: vars.inbox.item.borderBottom,
    flexDirection: 'column',
    flex: 1,
    cursor: 'pointer',
    boxSizing: 'border-box',
    background: vars.color.background,
    paddingTop: vars.inbox.item.paddingTop,
    paddingBottom: vars.inbox.item.paddingBottom,
    paddingLeft: vars.inbox.item.paddingLeft,
    paddingRight: vars.inbox.item.paddingRight,
    userSelect: 'none',
    gap: '12px',
    selectors: {
      '&:hover': {
        background: vars.color.surfaceOverlay,
      },
      '&:last-of-type': {
        marginBottom: vars.inbox.item.paddingBottom,
      },
    },
  },

  variants: {
    active: {
      true: {
        background: vars.color.surfaceOverlay,
      },
    },
  },
});
