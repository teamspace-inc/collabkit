import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from './theme';

export const typeahead = style({
  position: 'absolute',
  background: vars.mentions.typeahead.background,
  borderRadius: vars.mentions.typeahead.borderRadius,
  zIndex: 9999,
  padding: vars.mentions.typeahead.padding,
  boxShadow: vars.mentions.typeahead.boxShadow,
});

export const mark = style({
  background: vars.mentions.typeahead.item.mark.background,
  borderRadius: vars.mentions.typeahead.item.mark.borderRadius,
  color: vars.mentions.typeahead.item.mark.color,
  fontWeight: vars.mentions.typeahead.item.mark.fontWeight,
});

export const list = style({
  padding: 0,
  listStyle: 'none',
  margin: 0,
  borderRadius: vars.mentions.typeahead.borderRadius,
  zIndex: 9999,
  width: '100%',
});

export const nameAndEmailWrapper = style({
  gap: vars.mentions.typeahead.item.nameAndEmailWrapper.gap,
  flexDirection: vars.mentions.typeahead.item.nameAndEmailWrapper.flexDirection,
  display: 'flex',
});

export const item = recipe({
  base: {
    padding: vars.mentions.typeahead.item.padding,
    margin: 0,
    boxSizing: 'border-box',
    minWidth: '10ch',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    fontSize: vars.mentions.typeahead.item.fontSize,
    lineHeight: vars.mentions.typeahead.item.lineHeight,
    justifyContent: 'left',
    alignItems: 'center',
    gap: vars.mentions.typeahead.item.gap,
    outline: 'none',
    cursor: 'pointer',
    color: vars.mentions.typeahead.item.color,
    fontWeight: vars.mentions.typeahead.item.fontWeight,
    selectors: {
      '&:first-of-type': {
        borderTopLeftRadius: vars.mentions.typeahead.item.borderRadius,
        borderTopRightRadius: vars.mentions.typeahead.item.borderRadius,
      },
      '&:last-of-type': {
        borderBottomLeftRadius: vars.mentions.typeahead.item.borderRadius,
        borderBottomRightRadius: vars.mentions.typeahead.item.borderRadius,
      },
    },
  },

  variants: {
    active: {
      true: {
        background: vars.mentions.typeahead.item.active.background,
        color: vars.mentions.typeahead.item.active.color,
      },
    },
  },
});

export const name = style({
  color: vars.mentions.typeahead.item.name.color,
  fontWeight:
    vars.mentions.typeahead.item.name.fontWeight ?? vars.mentions.typeahead.item.fontWeight,
  fontSize: vars.mentions.typeahead.item.name.fontSize ?? vars.mentions.typeahead.item.fontSize,
  lineHeight:
    vars.mentions.typeahead.item.name.lineHeight ?? vars.mentions.typeahead.item.lineHeight,
  letterSpacing:
    vars.mentions.typeahead.item.name.letterSpacing ?? vars.mentions.typeahead.item.letterSpacing,
});

export const email = style({
  color: vars.mentions.typeahead.item.email.color,
  fontWeight:
    vars.mentions.typeahead.item.email.fontWeight ?? vars.mentions.typeahead.item.fontWeight,
  fontSize: vars.mentions.typeahead.item.email.fontSize ?? vars.mentions.typeahead.item.fontSize,
  lineHeight:
    vars.mentions.typeahead.item.email.lineHeight ?? vars.mentions.typeahead.item.lineHeight,
  display: vars.mentions.typeahead.item.email.display,
  letterSpacing:
    vars.mentions.typeahead.item.email.letterSpacing ?? vars.mentions.typeahead.item.letterSpacing,
});

export const mentionStyle = style({
  fontWeight: vars.mentions.pill.fontWeight,
  color: vars.mentions.pill.color,
  background: vars.mentions.pill.background,
  borderRadius: vars.mentions.pill.borderRadius,
  padding: vars.mentions.pill.padding,
  fontSize: vars.mentions.pill.fontSize,
  lineHeight: vars.mentions.pill.lineHeight,
  letterSpacing: vars.mentions.pill.letterSpacing,
});
