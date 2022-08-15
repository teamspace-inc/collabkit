import { css } from '@stitches/react';

export const typeahead = css({
  position: 'fixed',
  background: '$neutral1',
  boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
  borderRadius: '$radii$0',
  zIndex: 9999,
  margin: '4px 0 0 -2px',
  padding: 0,
});

export const typeaheadList = css({
  padding: 0,
  listStyle: 'none',
  margin: 0,
  borderRadius: '$radii$0',
  zIndex: 9999,
});

export const typeaheadListItem = css({
  padding: '8px 12px',
  margin: 0,
  boxSizing: 'border-box',
  minWidth: '10ch',
  display: 'flex',
  width: '$sizes$threadPreviewWidth',
  fontSize: '$fontSize$2',
  lineHeight: '$lineHeights$0',
  justifyContent: 'left',
  alignItems: 'center',
  gap: '6px',
  outline: 'none',
  cursor: 'pointer',
  color: '$neutral12',
  fontWeight: '$fontWeights$1',
  '&:first-of-type': {
    borderTopLeftRadius: '$radii$0',
    borderTopRightRadius: '$radii$0',
  },
  '&:last-of-type': {
    borderBottomLeftRadius: '$radii$0',
    borderBottomRightRadius: '$radii$0',
  },
  variants: {
    selected: {
      true: {
        background: '$neutral5',
        color: '$neutral12',
      },
    },
  },
});
