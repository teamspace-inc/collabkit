import { css } from '@stitches/react';

export const picker = css({
  padding: '5px 5px',
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '30px',
  boxShadow: '0px 5px 20px rgba(0,0,0,0.1), 0px 1px 0px rgba(0,0,0,0.05)',
  position: 'absolute',
  top: '-45px',
  left: '30px',
  background: 'white',
  fontSize: '24px',
  zIndex: 999,
});

export const emojiReaction = css({
  width: '35px',
  height: '35px',
  display: 'flex',
  borderRadius: '35px',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&:hover': {
    background: '$neutral3',
  },
});
