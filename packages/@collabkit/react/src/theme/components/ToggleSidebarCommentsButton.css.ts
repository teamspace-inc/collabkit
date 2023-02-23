import { style } from '@vanilla-extract/css';
import { button } from './Button.css';

export const toggleSidebarCommentsButton = style([
  button({ type: 'primary' }),
  {
    gap: '8px',
  },
]);
