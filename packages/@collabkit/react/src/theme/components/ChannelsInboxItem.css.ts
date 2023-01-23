import { fallbackVar, globalStyle, style } from '@vanilla-extract/css';
import { name as profileName } from './Profile.css';
import { timestamp as commentTimestamp, body as commentBody } from './Comment.css';
import { vars } from '../theme/index.css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import * as styles from './InboxItem.css';

export const name = style([profileName]);

export const commentRoot = style([styles.commentRoot]);

export const body = style([commentBody]);

globalStyle(`${commentRoot} p`, {
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const nameAndTimestampWrapper = style([
  styles.nameAndTimestampWrapper,
  {
    alignItems: 'center',
  },
]);

export const actionButtonWrapper = style([
  styles.nameAndTimestampWrapper,
  {
    gap: '0',
    visibility: 'hidden',
    selectors: {
      '&:hover': {
        visibility: 'visible',
      },
    },
  },
]);

export const unreadDot = style([styles.unreadDot, {
  position: 'inherit',
  left: 'inherit',
  background: fallbackVar(vars.sidebar.unreadDot.background, vars.color.attentionBlue),
}]);

export const header = style([styles.header]);

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
    cursor: 'default',
    boxSizing: 'border-box',
    background: fallbackVar(vars.inbox.item.background, vars.color.background),
    paddingTop: fallbackVar(vars.inbox.item.paddingTop, vars.space[4]),
    paddingBottom: fallbackVar(vars.inbox.item.paddingBottom, vars.space[4]),
    paddingLeft: fallbackVar(vars.inbox.item.paddingLeft, vars.space[4]),
    paddingRight: fallbackVar(vars.inbox.item.paddingRight, vars.space[4]),
    userSelect: 'none',
    fontFamily: vars.fontFamily,
    gap: '12px',
    selectors: {
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

export const composerWrapper = style({
  paddingLeft: vars.space[4],
});

export const threadReplyWrapper = style({
  paddingLeft: vars.space[8],
  color: '#888888',
  fontFamily: vars.fontFamily,
  fontSize: vars.text.base.fontSize,
  cursor: 'pointer',
  display: 'flex',
});

export const threadReplyCommentWrapper = style({
  paddingLeft: vars.space[8],
});

export const commentThreadWrapper = style({
  paddingLeft: vars.space[8],   
  display: 'flex',
  flexDirection: 'row'
});