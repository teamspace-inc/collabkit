import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  padding: fallbackVar(vars.commentList.padding, `${vars.space[2]} 0`),
  gap: fallbackVar(vars.commentList.gap, vars.space[0]),
  ':empty': {
    display: 'none',
  },
});
