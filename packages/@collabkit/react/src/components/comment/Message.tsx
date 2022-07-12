import { styled } from '../UIKit';

export const StyledMessageTimestamp = styled('span', {
  fontSize: '$fontSize$1',
  color: '$colors$secondaryText',
  textDecoration: 'none',
  fontWeight: '$fontWeights$0',
});

export const StyledMessage = styled('div', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  gap: 0,
  flex: 0,
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  color: '$colors$primaryText',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  variants: {
    ui: {
      bubbles: {
        padding: '$padding$0 $padding$1',
        background: '$neutral2',
        borderRadius: '$radii$1',
      },
      freeform: {
        gap: '$space$1',
        padding: '0 0 $padding$1',
        borderRadius: '$radii$1',
      },
      preview: {
        cursor: 'pointer',
        padding: '$padding$0 $padding$0',
        background: '$neutral2',
        borderRadius: '$radii$1',
        gap: 0,
      },
    },
    type: {
      default: {},
      'inline-start': {
        borderBottomLeftRadius: '$radii$0',
      },
      inline: {
        borderBottomLeftRadius: '$radii$0',
        borderTopLeftRadius: '$radii$0',
      },
      'inline-end': {
        borderTopLeftRadius: '$radii$0',
      },
    },
  },
  compoundVariants: [
    {
      ui: 'bubbles',
      type: 'inline-start',
      css: {
        borderRadius: '$radii$1',
        borderBottomLeftRadius: '$radii$0',
      },
    },
    {
      ui: 'bubbles',
      type: 'inline',
      css: {
        borderRadius: '$radii$1',
        borderBottomLeftRadius: '$radii$0',
        borderTopLeftRadius: '$radii$0',
      },
    },
    {
      ui: 'bubbles',
      type: 'inline-end',
      css: {
        borderRadius: '$radii$1',
        borderTopLeftRadius: '$radii$0',
      },
    },
  ],
});
