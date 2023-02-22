import { fallbackVar, style } from '@vanilla-extract/css';
import { vars } from '../theme/index.css';

export const root = style({
  background: fallbackVar(vars.inbox.background, vars.color.background),
});
