import { css } from '@stitches/react';

const unread = css({
  variants: {
    isUnread: {
      true: {
        fontWeight: 500,
        color: '$neutral12',
      },
    },
  },
});

export const inbox = css({
  borderRadius: 11,
  background: '$neutral1',
  maxWidth: '320px',
  border: '1px solid rgba(0,0,0,0.1)',
});

export const inboxItem = css(
  {
    cursor: 'pointer',
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    borderBottom: '1px solid $neutral4',
    fontSize: 14,
    lineHeight: '20px',
    '&:last-of-type': {
      borderBottom: 0,
    },
    '&:hover': {
      background: '$neutral3',
      '&:first-of-type': {
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
      },
      '&:last-of-type': {
        borderBottomRightRadius: 11,
        borderBottomLeftRadius: 11,
      },
    },
  },
  unread
);

export const threadName = css(
  {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '20px',
    color: '$neutral11',
    variants: {
      isUnread: {
        true: {
          fontWeight: 700,
        },
      },
    },
  },
  unread
);

export const threadMessagePreview = css(
  {
    color: '$neutral11',
    overflow: 'hidden',
    wordBreak: 'none',
    characterBreak: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  unread
);
