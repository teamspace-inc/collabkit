import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { styled } from '@stitches/react';

export const Provider = TooltipPrimitive.Provider;
export const Root = TooltipPrimitive.Root;
export const Trigger = TooltipPrimitive.Trigger;

export const Content = styled(TooltipPrimitive.Content, {
  borderRadius: '$radii$1',
  padding: '$space$0 $space$1',
  fontSize: 13,
  lineHeight: '22px',
  color: '$colors$tooltipText',
  backgroundColor: '$colors$tooltipBackground',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 5.5px 16.5px -10px, hsl(206 22% 7% / 20%) 0px 5.5px 11px -15px',

  '&[data-align="start"][data-side="bottom"]': {
    borderTopLeftRadius: 0,
  },

  '&[data-align="start"][data-side="top"]': {
    borderBottomLeftRadius: 0,
  },

  '&[data-align="end"][data-side="bottom"]': {
    borderTopRightRadius: 0,
  },

  '&[data-align="end"][data-side="top"]': {
    borderBottomRightRadius: 0,
  },
});

export const Hint = styled('span', {
  color: '$colors$tooltipTextSecondary',
  padding: '0 0 0 11px',
  fontSize: 12,
  lineHeight: '22px',
});

export const Arrow = styled(TooltipPrimitive.Arrow, {
  fill: '$colors$tooltipBackground',
});
