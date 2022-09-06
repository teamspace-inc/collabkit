import { css } from '@stitches/react';

export const typeahead = css({
  position: 'absolute',
  background: '$colors$mentionDropdownBackgroundColor',
  borderRadius: '$radii$mentionDropdownBorderRadius',
  zIndex: 9999,
  padding: 0,
  boxShadow: `$shadows$mentionDropdownBoxShadow`,
});

export const typeaheadList = css({
  padding: 0,
  listStyle: 'none',
  margin: 0,
  borderRadius: '$radii$0',
  zIndex: 9999,
  width: '100%',
});

export const typeaheadListItem = css({
  padding: '$padding$mentionDropdownItemPadding',
  margin: 0,
  boxSizing: 'border-box',
  minWidth: '10ch',
  display: 'flex',
  width: '100%',
  fontSize: '$fontSize$mentionDropdownItemFontSize',
  lineHeight: '$lineHeights$mentionDropdownItemLineHeight',
  justifyContent: 'left',
  alignItems: 'center',
  gap: '6px',
  outline: 'none',
  cursor: 'pointer',
  color: '$colors$mentionDropdownTextColor',
  fontWeight: '$fontWeights$mentionDropdownItemFontWeight',
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
        background: '$colors$mentionDropdownItemSelectedBackgroundColor',
        color: '$colors$mentionDropdownItemSelectedTextColor',
      },
    },
  },
});

export const typeaheadListItemName = css({});

export const typeaheadListItemEmail = css({
  fontWeight: 'normal',
  fontSize: '$fontSize$0',
});
