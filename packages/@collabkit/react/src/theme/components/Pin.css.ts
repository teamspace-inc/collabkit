import { fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const pin = recipe({
  base: {
    position: 'absolute',
    width: 32,
    height: 32,
    marginTop: -32,
    top: 0,
    left: 0,
  },
  variants: {
    pointerEvents: {
      none: {
        pointerEvents: 'none',
      },
      all: {
        pointerEvents: 'all',
      },
    },
    isSelected: {
      true: {},
      false: {},
    },
  },
});

export const pinIcon = recipe({
  base: {
    fill: fallbackVar(vars.pin.background, vars.color.background),
    stroke: fallbackVar(vars.pin.borderColor, vars.color.icon),
  },
  variants: {
    isSelected: {
      true: {
        fill: fallbackVar(vars.pin.active.background, vars.color.background),
        stroke: fallbackVar(vars.pin.active.borderColor, vars.color.attentionBlue),
      },
    },
  },
});

export const pinAvatar = style({
  position: 'absolute',
  top: 4,
  left: 4,
});

export const pinThread = style({
  background: vars.color.background,
  borderRadius: '12px',
  width: 240,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.high,
  display: 'flex',
  flexDirection: 'column',
});

export const pinPreview = style({
  padding: `${vars.space[2]} ${vars.space[4]}`,
  cursor: 'pointer',
});
