import { styled } from '@stitches/react';
import * as Tooltip from '@radix-ui/react-tooltip';

const StyledTooltipTrigger = styled(Tooltip.Trigger, {
  background: 'none',
  border: 'none',
  padding: '0px',
});

const StyledTooltipContent = styled(Tooltip.Content, {
  borderRadius: '6px',
  padding: '3px 6px',
  fontSize: 13,
  lineHeight: '22px',
  color: 'white',
  backgroundColor: 'black',
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

const Root = Tooltip.Root;
const Content = StyledTooltipContent;
const Trigger = StyledTooltipTrigger;
const Arrow = Tooltip.Arrow;

export { Root, Content, Trigger, Arrow };
