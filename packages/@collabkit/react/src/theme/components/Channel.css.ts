import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';
import * as styles from './Inbox.css';

export const root = style([
  styles.root,
  {
    width: fallbackVar(vars.inbox.width, '360px'),
  },
]);

export const threadList = style({
  padding: `${vars.space[4]} 0`,
});

export const header = style([styles.header]);
