import { calc } from '@vanilla-extract/css-utils';
import { vars } from '../../theme/index.css';

export const SpaceBase = {
  space: {
    0: '0px',
    1: '4px',
    2: calc.multiply(vars.space[1], 2),
    3: calc.multiply(vars.space[1], 3),
    4: calc.multiply(vars.space[1], 4),
  },
};
