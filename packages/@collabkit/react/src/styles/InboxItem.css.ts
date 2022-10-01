import { style } from '@vanilla-extract/css';

export const replyCount = style({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '160%',
  letterSpacing: -0.1,
  color: '#2C915E',
});

export const commentCreatorName = style({
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '160%',
  letterSpacing: -0.1,
  color: '#000000',
});

export const unreadDot = style({
  width: 8,
  height: 8,
  borderRadius: 8,
  background: '#007FF5',
  position: 'absolute',
  left: -16,
});

export const commentTimestamp = style({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '160%',
  letterSpacing: -0.1,
  color: '#6A7278',
});

export const thread = {
  root: style({
    display: 'flex',
    borderBottom: '1px solid #E3E9ED',
    flexDirection: 'column',
    flex: 1,
  }),
  content: style({
    background: 'white',
    padding: '32px 24px',
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
    selectors: {
      '&:hover': {
        background: '#E3E9ED',
      },
    },
  }),
};
