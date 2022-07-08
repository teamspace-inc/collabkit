import { styled } from '../UIKit';

export const StyledMessageTimestamp = styled('span', {
  fontSize: 12,
  color: '$neutral9',
  textDecoration: 'none',
  fontWeight: '400',
});

export const StyledMessage = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: 0,
  flex: 0,
  fontSize: 14,
  lineHeight: '20px',
  color: '$neutral12',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  variants: {
    ui: {
      bubbles: {
        padding: '5px 10px',
        background: '$neutral2',
        borderRadius: 11,
      },
      indicator: {
        padding: '5px 10px',
        background: '$neutral12',
        borderRadius: 11,
        gap: 0,
      },
    },
    type: {
      default: {},
      'inline-start': {
        borderBottomLeftRadius: 3,
      },
      inline: {
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
      },
      'inline-end': {
        borderTopLeftRadius: 3,
      },
    },
  },
  compoundVariants: [
    {
      ui: 'bubbles',
      type: 'inline-start',
      css: {
        borderRadius: 11,
        borderBottomLeftRadius: 3,
      },
    },
    {
      ui: 'bubbles',
      type: 'inline',
      css: {
        borderRadius: 11,
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
      },
    },
    {
      ui: 'bubbles',
      type: 'inline-end',
      css: {
        borderRadius: 11,
        borderTopLeftRadius: 3,
      },
    },
  ],
});
