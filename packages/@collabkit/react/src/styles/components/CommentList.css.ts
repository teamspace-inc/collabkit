import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  padding: fallbackVar(vars.commentList.padding, `${vars.space[4]} 0`),
  gap: vars.space[2],

  ':empty': {
    padding: 0,
    height: vars.space[4],
  },
});
