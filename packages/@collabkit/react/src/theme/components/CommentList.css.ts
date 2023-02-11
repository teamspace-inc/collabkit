import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  padding: fallbackVar(vars.commentList.padding, `${vars.space[4]} 0`),
  gap: fallbackVar(vars.commentList.gap, vars.space[0]),
  ':empty': {
    padding: 0,
    // todo @nc: make this configurable...
    // probably shouldn't be exposed as a comment list var though...
    height: vars.space[4],
  },
});

export const group = style({
  selectors: {
    '&:empty': {
      display: 'none',
    },
  },
});
