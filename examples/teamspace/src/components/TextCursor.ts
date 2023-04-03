import { ClientColorVariants, ClientColor } from '../utils/Colors';
import { css } from '@stitches/react';
import { Z } from 'state/constants';

export const TextCursor = css('div', {
  position: 'relative',

  // only way to have a cursor that matches
  // the line height of the text dynamically.
  '&:after': {
    position: 'absolute',
    content: '',
    top: 0,
    left: -1,
    bottom: 0,
    zIndex: Z.TEXT_CURSOR,
    width: '2px',
    variants: {
      color: ClientColorVariants,
    },
  },

  pointerEvents: 'none',
  variants: {
    color: ClientColorVariants,
  },
});

export const renderTextCursor = (color: ClientColor) => {
  const cursor = document.createElement('span');
  cursor.className = TextCursor({ color }).className;
  return cursor;
};

export const getTextSelectionStyle = (color: ClientColor) => {
  return `background-color: ${ClientColorVariants[color]?.textSelectionColor}`;
};
