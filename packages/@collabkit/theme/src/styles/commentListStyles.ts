import { css } from '@stitches/react';

export const list = css({
  padding: '8px 0',
  display: 'flex',
  gap: '8px',
  flexDirection: 'column',
  flex: 1,
});

export const seeAllRepliesLink = css({
  fontSize: '13px',
  display: 'flex',
  marginTop: '0px',
  paddingBottom: '8px',
  marginLeft: 'calc(16px + 24px + 8px)',
  color: '$colors$secondaryText',
});
