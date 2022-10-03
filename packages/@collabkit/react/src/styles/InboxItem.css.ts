import { style } from '@vanilla-extract/css';
import { name as profileName } from './Profile.css';
import { timestamp as commentTimestamp, root as commentRootBase } from './Comment.css';
import { vars } from './themes.css';

export const replyCount = style({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '160%',
  letterSpacing: -0.1,
  color: '#2C915E',
});

export const name = style([profileName, {}]);

export const commentRoot = style([
  commentRootBase(),
  {
    padding: 0,
  },
]);

export const unreadDot = style({
  width: 8,
  height: 8,
  borderRadius: 8,
  background: '#007FF5',
  position: 'absolute',
  left: -16,
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

export const root = style({
  display: 'flex',
  // borderBottom: `1px solid ${vars.color.surface}`,
  flexDirection: 'column',
  flex: 1,
  boxSizing: 'border-box',
  background: vars.color.background,
  padding: '32px 24px',
  gap: '16px',
  selectors: {
    '&:hover': {
      background: vars.color.surfaceOverlay,
    },
  },
});
