import { fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';
import * as styles from './Inbox.css';

export const root = style([
  styles.root,
  {
    width: fallbackVar(vars.inbox.width, '360px'),
  },
]);

export const threadList = style({
  padding: `${vars.space[2]} 0 0`,
});

export const commentList = recipe({});

export const thread = recipe({
  base: {
    marginLeft: vars.space[2],
    marginRight: vars.space[3],
  },
  variants: {
    isSelected: {
      true: {
        border: `1px solid ${vars.color.attentionBlue}`,
        borderRadius: '8px',
      },
      false: {
        border: `1px solid transparent`,
      },
    },
  },
});

export const header = style([styles.header]);
