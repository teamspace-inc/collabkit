import { style } from '@vanilla-extract/css';
import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';

export const transitionClassNames: CSSTransitionClassNames = {
  enter: style({
    opacity: 0,
    transform: 'translateY(100%)',
  }),
  enterActive: style({
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'all 200ms ease-out',
  }),
  exit: style({
    transform: 'translateY(0)',
    opacity: 1,
  }),
  exitActive: style({
    transform: 'translateY(100%)',
    transition: 'all 200ms ease-in',
    opacity: 0,
  }),
};
