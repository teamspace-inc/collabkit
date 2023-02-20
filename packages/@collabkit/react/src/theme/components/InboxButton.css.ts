import { style } from '@vanilla-extract/css';
import { button } from './Button.css';

export const inboxButton = style([
  button({ type: 'primary' }),
  {
    gap: '8px',
    width: 200,
  },
]);
